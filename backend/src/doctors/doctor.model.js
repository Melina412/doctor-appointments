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
  title: String,
  first_name: String,
  last_name: String,
  name: {
    type: String,
    get: function () {
      return `${this.title} ${this.first_name} ${this.last_name}`;
    },
  },
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

// pre function (middleware) für updateOne weil sonst das name feld nicht upgedated wird
doctorSchema.pre('updateOne', function (next) {
  const { title, first_name, last_name } = this.getUpdate().$set;

  if (title || first_name || last_name) {
    this.updateOne(
      {},
      {
        $set: {
          name: `${title || ''} ${first_name || ''} ${last_name || ''}`,
        },
      }
    );
  }

  next();
});

export const Doctor = mongoose.model('doctor', doctorSchema);
