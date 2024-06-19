import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appointment',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxLength: 200,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Review = mongoose.model('review', reviewSchema);
