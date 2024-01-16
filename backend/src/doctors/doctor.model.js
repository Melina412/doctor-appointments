import mongoose from 'mongoose';
import { visitingHoursSchema } from '../models/visitinghours.model.js';

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  about: String,
  avatar: String,
  visiting_hours: visitingHoursSchema,
});

export const Doctor = mongoose.model('doctor', doctorSchema);
