import {
  generateCalendarDays,
  generateTimeSlots,
} from './appointments.generator.js';
import { Doctor } from '../doctors/doctor.model.js';

export async function getDaysPerMonth(req, res) {
  const month = req.query.month;
  const year = req.query.year;
  const today = new Date();
  console.log({ month }, { year });

  // die funktion funktioniert aktuell nur für das jahr 2024
  const monthOverview = generateCalendarDays(today);
  const query = monthOverview[year] ? monthOverview[year][month] || [] : [];
  console.log(query);

  res.json({ year: year, month: month, days: query });
}

export async function getTimeSlots(req, res) {
  const doctor_id = req.query.user;

  try {
    const doctor = await Doctor.findById(doctor_id).lean().exec();
    // lean konvertiert mongoose objekte in normale js objekte, was notwendig ist um object methods darauf anwenden zu können

    if (doctor) {
      const visitingHours = doctor.visiting_hours;
      console.log(doctor.name, { visitingHours });

      const getDays = () => (visitingHours ? Object.keys(visitingHours) : []);
      let days = getDays();

      console.log({ days });

      let timeSlots = {};
      for (const day of days) {
        timeSlots[day] = generateTimeSlots(day, visitingHours);
      }

      console.log({ timeSlots });
      res.json({ timeSlots: timeSlots });
    }
  } catch (error) {
    console.log(error);
  }
  res.end();
}
