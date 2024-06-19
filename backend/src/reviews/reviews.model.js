import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
    required: true,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appointment',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    maxLength: 200,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  auth: {
    path: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 6,
    },
  },
});

export const Review = mongoose.model('review', reviewSchema);
