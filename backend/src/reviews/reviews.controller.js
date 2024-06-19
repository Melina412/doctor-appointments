import { Review } from './reviews.model.js';
import { Doctor } from '../doctors/doctor.model.js';
import { Appointment } from '../appointments/appointments.model.js';
import { sendEmail } from '../config/email.config.js';
import { reviewDoctorTemplate } from '../templates/email.template.js';
import { CronJob, sendAt } from 'cron';
import { createNumericalCode, createSecret } from '../auth/auth.service.js';
import 'dotenv/config';

export async function enableReview(req, res) {
  // 1. doctor muss irgendwie bestätigen dass der termin stattgefunden hat ✅
  // aus der bestätigung kommen dann auch die daten des termins ✅
  // 2. email template ✅ reviewDoctorTemplate = (patientemail,patientname,doctorname, date,code,link)
  // 3. der tag des termins muss ermittelt werden ✅
  // 4. email dann 24h später schicken ✅
  // 5. jetzt wirds tricky: in der mail ist ein link zum review formular. an der stelle muss der patient irgendwie autorisiert werden.
  // a) entweder reicht der link in der mail um einen token zu erstellen oder
  // b) der patient bekommt in der mail auch einen code den er auf der seite eingibt. denke das ist notwendig, weil das formular ja keine geschütze route ist.
  // vieleicht sollte ich das mit der geschützten route doch machen? *
  // 6. für die review gibt es dann zwei möglichkeiten: a) die reviews werden als subschema im doctor schema gespeichert oder b) es gibt eine revirew collection
  // der vorteil von a) ist, dass man die reviews eines doctors direkt löschen kann, wenn das profil gelöscht werden soll
  // der vorteil von b) ist, dass man die reviews bestimmter patienten besser finden und ggf löschen kann. reviews von patienten in allen möglichen subschemas finden ist glaube ich schwieriger
  // also b? -> ja
  // 7. achso irgendwie muss die id des patienten aus dem termin schema mit der review verknüpft werden.
  // 8. * ok das mit der geschützten route ist doch notwendig weil sonst ja einfach jemand einen ausgedachten pfad eingeben kann und auf die route kommt was natürlich nicht möglich sein darf. also muss ich einen zweiten protector in react vorschalten der dann prüft ob  1. der pfad überhaupt existiert und 2. ob der zugriff erlaubt ist.
  // 9. dann gibts dafür halt auch einen token, der wird mit der eingabe des codes erstellt

  console.log('req.body:', req.body);
  const { date, patient, _id } = req.body;
  const { email, full_name } = patient;

  console.log({ date, patient, _id }, { email, full_name });

  console.log('req.body.patient._id', req.body.patient._id);
  try {
    const doctor = await Doctor.findById(req.body.doctor).exec();
    if (doctor) {
      console.log('doctor:', doctor.name);
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
      console.log({ appointmentDate });
      console.log({ emailDate });
      const now = Date();
      console.log({ now });

      //# cron job schedulen

      const cronTime = `${emailDate.getSeconds()} ${emailDate.getMinutes()} ${emailDate.getHours()} ${emailDate.getDate()} ${
        emailDate.getMonth() + 1
      } *`;
      // const action = sendEmail(
      //   reviewDoctorTemplate(email, full_name, doctorName, date, code, link)
      // );

      //   scheduleCronJob(cronTime, action);

      console.log({ cronTime });
      const dt = sendAt(cronTime);
      console.log(`cron job scheduled time: ${dt.toISO()}`);
      // die cronTime gibt einfach die Zeit an wie man sie eingibt unabhängig von zeitzone/offset. welche zeitzone man meint muss man dann im cron job angeben

      const job = new CronJob(
        cronTime,
        function () {
          sendEmail(
            reviewDoctorTemplate(email, full_name, doctorName, date, code, link)
          );
          console.log('cron job successfully executed!');
        },
        null,
        true,
        'GMT'
      );
      console.log('is job running? ', job.running);

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
  console.log('req.body:', req.body);
  // datum updaten?

  res.json({
    success: true,
    message: 'review added to db',
  });
}
export async function getReviews(req, res) {
  res.end();
}
