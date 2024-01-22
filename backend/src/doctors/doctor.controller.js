import { Doctor } from '../doctors/doctor.model.js';

export async function getDoctors(_, res) {
  try {
    const doctors = await Doctor.find().select({
      password: 0,
      salt: 0,
      __v: 0,
    });
    res.json(doctors);
  } catch (error) {
    console.error('doctors could not be loaded', error);
    res.status(500).json();
  }
  res.end();
}
