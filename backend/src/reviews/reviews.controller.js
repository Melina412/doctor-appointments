import { Review } from './reviews.model.js';
import { Doctor } from '../users/user.model.js';
import { Appointment } from '../appointments/appointments.model.js';
import { sendEmail } from '../config/email.config.js';
import { reviewDoctorTemplate } from '../templates/email.template.js';
import { CronJob, sendAt } from 'cron';
import { createNumericalCode, createSecret } from '../auth/auth.service.js';
import 'dotenv/config';

export async function enableReview(req, res) {
  // console.log('req.body:', req.body);
  const { date, patient, _id } = req.body;
  const { email, full_name } = patient;

  // console.log({ date, patient, _id }, { email, full_name });
  // console.log('req.body.patient._id', req.body.patient._id);
  try {
    const doctor = await Doctor.findById(req.body.doctor).exec();
    if (doctor) {
      // console.log('doctor:', doctor.name);
      const doctorName = doctor.name;

      //# code generieren

      const code = createNumericalCode(6);
      const pathSecret = createSecret(24);
      const link = `${process.env.ALLOWED_ORIGIN}/review/${pathSecret}`;

      //# zeit berechnen

      const appointmentDate = new Date(date);
      const emailDate = new Date(
        appointmentDate.getTime() + 24 * 60 * 60 * 1000
      );
      const now = Date();
      // console.log({ appointmentDate });
      // console.log({ emailDate });
      // console.log({ now });

      //# cron job schedulen

      const cronTime = `${emailDate.getSeconds()} ${emailDate.getMinutes()} ${emailDate.getHours()} ${emailDate.getDate()} ${
        emailDate.getMonth() + 1
      } *`;

      // const action = sendEmail(
      //   reviewDoctorTemplate(email, full_name, doctorName, date, code, link)
      // );
      //   scheduleCronJob(cronTime, action);

      // console.log({ cronTime });
      const dt = sendAt(cronTime);
      // console.log(`cron job scheduled time: ${dt.toISO()}`);
      // die cronTime gibt einfach die Zeit an wie man sie eingibt unabhängig von zeitzone/offset. welche zeitzone man meint muss man dann im cron job angeben

      const job = new CronJob(
        cronTime,
        function () {
          sendEmail(
            reviewDoctorTemplate(
              email,
              full_name,
              doctorName,
              appointmentDate,
              code,
              link
            )
          );
          // console.log('cron job successfully executed!');
        },
        null,
        true,
        'GMT'
      );
      // console.log('is job running? ', job.running);

      //# termin in der db auf done setzen
      if (_id) {
        const updateResult = await Appointment.updateOne(
          { _id: _id },
          {
            $set: {
              done: true,
            },
          }
        );
        if (updateResult.modifiedCount > 0) {
          const updatedAppointment = await Appointment.findById(_id).exec();
          // console.log({ updatedAppointment });

          //# initialize review in db

          const review = new Review({
            doctor: req.body.doctor,
            appointment: _id,
            patient: req.body.patient._id,
            rating: 0,
            auth: {
              path: pathSecret,
              code: code,
            },
          });

          try {
            await review.save();

            res.status(201).json({
              success: true,
              message: 'appointment set done & review initialized in db!',
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
          }
        } else {
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

export async function addReview(req, res) {
  const { rating, comment } = req.body;
  const reviewId = req.payload.review;
  // console.log('req.body:', req.body);
  // console.log('req.payload:', req.payload);

  const query = {
    rating: rating,
    date: Date.now(),
    auth: {
      path: null,
      code: null,
    },
  };

  if (comment.length > 1) {
    query.comment = comment;
  }

  try {
    const updateResult = await Review.updateOne(
      { _id: reviewId },
      {
        $set: query,
      }
    );
    if (updateResult.modifiedCount > 0) {
      const updatedRewiew = await Review.findById(reviewId).exec();
      // console.log({ updatedRewiew });

      res.clearCookie('rev_doctorauth');
      res.json({
        success: true,
        message: 'review added to db',
      });
    } else {
      console.error('review update failed');
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getReviews(req, res) {
  res.end();
}
