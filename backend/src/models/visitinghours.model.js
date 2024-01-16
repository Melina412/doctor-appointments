import mongoose from 'mongoose';

export const visitingHoursSchema = new mongoose.Schema({
  days: {
    type: Map,
    of: {
      open: { type: String },
      close: { type: String },
    },
  },
});
