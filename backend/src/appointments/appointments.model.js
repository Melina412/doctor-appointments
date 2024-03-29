import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  date: Date,
  time_slot: String,
  confirmed: Boolean,
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  },
  patient: new mongoose.Schema({
    full_name: String,
    email: String,
    age_group: String,
    gender: String,
    problem: String,
  }),
});

export const Appointment = mongoose.model('appointment', appointmentSchema);
