import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    validate: {
      validator: function (value) {
        return value >= Date.now();
      },
    },
  },
  time_slot: String,
  confirmed: Boolean || null,
  // confirmation_response: Boolean || null,
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  },
  patient: new mongoose.Schema({
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age_group: String,
    gender: String,
    problem: {
      type: String,
      maxLength: 500,
    },
  }),
  done: Boolean || null,
});

export const Appointment = mongoose.model('appointment', appointmentSchema);
