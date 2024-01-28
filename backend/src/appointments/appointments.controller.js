import {
  generateCalendarDays,
  generateTimeSlots,
} from './appointments.generator.js';
import { Doctor } from '../doctors/doctor.model.js';
import { Appointment } from './appointments.model.js';

export async function getDaysPerMonth(req, res) {
  const month = req.query.month;
  const year = req.query.year;
  const today = new Date();
  //   console.log({ month }, { year });

  // die funktion funktioniert aktuell nur für das jahr 2024
  const monthOverview = generateCalendarDays(today);
  const query = monthOverview[year] ? monthOverview[year][month] || [] : [];
  //   console.log(query);

  res.json({ year: year, month: month, days: query });
}

export async function getTimeSlots(req, res) {
  const doctor_id = req.query.doctor;

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
        timeSlots[day] = generateTimeSlots(day, visitingHours);
      }

      //   console.log({ timeSlots });
      res.json({ timeSlots: timeSlots });
    }
  } catch (error) {
    console.log(error);
  }
  res.end();
}

export async function requestAppointment(req, res) {
  console.log('req body:', req.body);

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

  try {
    const doctor = await Doctor.findById(doctor_id).exec();
    // console.log('doctor:', doctor.name);
    if (doctor) {
      const appointment = new Appointment({
        date,
        time_slot,
        confirmed: false,
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
          // hier muss ich die mail an den doctor senden!
          //
          //
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
