import mongoose from 'mongoose';
// import { visitingHoursSchema } from '../models/visitinghours.model.js';

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
  name: String,
  specialty: String,
  about: String,
  avatar: String,
  visiting_hours: {
    type: Map,
    of: new mongoose.Schema(
      {
        open: { type: String },
        close: { type: String },
      },
      { _id: false }
    ),
  },
});

export const Doctor = mongoose.model('doctor', doctorSchema);
