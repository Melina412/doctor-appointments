import {
  generateCalendarDays,
  generateTimeSlots,
} from './appointments.generator.js';
import { Doctor } from '../users/user.model.js';
import { Appointment } from './appointments.model.js';
import { sendEmail } from '../config/email.config.js';
import {
  newAppointmentTemplate,
  confirmAppointmentTemplate,
  declineAppointmentTemplate,
} from '../templates/email.template.js';
import mongoose from 'mongoose';

// $ getDaysPerMonth() --------------------------------------------------------
export async function getDaysPerMonth(req, res) {
  const month = req.query.month;
  const monthIndex = req.query.index;
  const year = req.query.year;

  // console.log({ monthIndex }, { year });

  const requestDate = new Date(year, monthIndex);
  // console.log({ requestDate });

  const monthOverview = generateCalendarDays(requestDate);
  // console.log({ monthOverview });

  // hier wird der month name zb 'June' gematcht, nicht der index!
  const days = monthOverview[year] ? monthOverview[year][month] || [] : [];
  // console.log('month, days:', month, days);

  // console.log('req backend: ', { year: year, month: month, days: days });
  res.json({ year: year, month: month, days: days });
}

// $ getTimeSlots() -----------------------------------------------------------
export async function getTimeSlots(req, res) {
  const doctor_id = req.query.doctor;

  // das hab ich wieder entfernt, die slots sollen alle im 24h format generiert und gespeichert werden
  // const hour12 = req.query.hour12;
  const hour12 = false;

  try {
    const doctor = await Doctor.findById(doctor_id).lean().exec();
    // lean konvertiert mongoose objekte in normale js objekte, was notwendig ist um object methods darauf anwenden zu können

    if (doctor) {
      const visitingHours = doctor.visiting_hours;
      //   console.log(doctor.name, { visitingHours });

      const getDays = () => (visitingHours ? Object.keys(visitingHours) : []);
      let days = getDays();

      //   console.log({ days });

      let timeSlots = {};
      for (const day of days) {
        timeSlots[day] = generateTimeSlots(day, visitingHours, hour12);
      }
      // console.log({ timeSlots });

      //# hier auch die appointments mitschicken!
      try {
        const doctorObjectId = new mongoose.Types.ObjectId(doctor_id);
        // console.log({ doctorObjectId });

        const appointments = await Appointment.aggregate([
          { $match: { doctor: doctorObjectId } },
          {
            $project: {
              date: 1,
              time_slot: 1,
              confirmed: 1,
            },
          },
        ]);
        // console.log({ appointments });

        res.json({
          timeSlots: timeSlots,
          bookedAppointments: appointments,
        });
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

// $ getAppointments() -----------------------------------------------------

export async function getAppointments(req, res) {
  const user_id = req.payload.user;

  try {
    const appointments = await Appointment.find({ doctor: user_id });
    // console.log({ appointments });
    res.json(appointments);
  } catch (error) {
    res.status(500).end();
  }
}

// $ requestAppointment() -----------------------------------------------------
export async function requestAppointment(req, res) {
  // console.log('req body:', req.body);

  const {
    full_name,
    age_group,
    gender,
    email,
    problem,
    date,
    time_slot,
    doctor_id,
  } = req.body;

  // hier error handling für  date: 'Invalid Date' / time_slot: 'null'

  try {
    const doctor = await Doctor.findById(doctor_id).exec();
    // console.log('doctor:', doctor.name);
    if (doctor) {
      const appointment = new Appointment({
        date,
        time_slot,
        confirmed: null,
        doctor: doctor._id,
        patient: {
          full_name,
          email,
          age_group,
          gender,
          problem,
        },
      });

      try {
        const result = await appointment.save();
        if (result) {
          const { email, name } = doctor;
          // console.log({ email, name });
          //! #####################################################################################
          //! EMAIL SENDEN AKTIVIEREN / DEAKTIVIEREN ##############################################
          sendEmail(newAppointmentTemplate(email, name, full_name));

          res.status(201).json({
            success: true,
            message: 'new appointment request added to db',
          });
        } else {
          res.status(400).json({
            success: false,
            message: 'appointment not saved',
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
}

// $ confirmAppointment() -----------------------------------------------------
export async function confirmAppointment(req, res) {
  const { id, action } = req.query;
  // console.log({ id, action });
  try {
    const appointment = await Appointment.findById(id).exec();
    // console.log('appointment found!');
    if (appointment) {
      // der doctor hat die möglichkeiten:
      // 1. accept - confirmed = true; der patient bekommt eine bestätigungsmail
      // 2. decline - confirmed = false; der patient bekommt eine absage mail
      // [ 3. cancel - confirmed = ?; gibts noch nicht ]
      let updateValue;
      if (action === 'confirm') {
        updateValue = true;
      } else if (action === 'decline') {
        updateValue = false;
      }
      // console.log({ updateValue });

      const updateResult = await Appointment.updateOne(
        { _id: id },
        { $set: { confirmed: updateValue } }
      );
      if (updateResult.modifiedCount > 0) {
        try {
          const updatedAppointment = await Appointment.findById(id).exec();
          // console.log('appointment updated in db! ---', updatedAppointment);

          const { confirmed, date, time_slot } = updatedAppointment;
          const patientName = updatedAppointment.patient.full_name;
          const patientEmail = updatedAppointment.patient.email;
          // console.log(confirmed, patientName, patientEmail);
          try {
            const doctor = await Doctor.findById(appointment.doctor).exec();
            // console.log('doctor:', doctor.name);
            if (doctor) {
              const { email, name } = doctor;

              //! #####################################################################################
              //! EMAIL SENDEN AKTIVIEREN / DEAKTIVIEREN ##############################################

              if (confirmed) {
                // //# confirmation mail to patient -----------------------------------------
                sendEmail(
                  confirmAppointmentTemplate(
                    patientEmail,
                    patientName,
                    name,
                    date,
                    time_slot
                  )
                );
              } else {
                //# decline mail to patient -----------------------------------------
                sendEmail(
                  declineAppointmentTemplate(
                    patientEmail,
                    patientName,
                    email,
                    name,
                    date,
                    time_slot
                  )
                );
              }

              res
                .status(201)
                .json({ success: true, message: 'appointment updated in db' });
            } else {
              res
                .status(404)
                .json({ success: false, message: 'doctor not found' });
            }
          } catch (error) {
            console.log(error);
            res
              .status(500)
              .json({ success: false, message: 'error while sending mail' });
          }
        } catch (error) {
          console.log(error);
          res
            .status(404)
            .json({ success: false, message: 'appointment not found' });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
