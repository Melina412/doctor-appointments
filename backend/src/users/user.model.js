import mongoose from 'mongoose';

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
      if (this.title && this.first_name && this.last_name) {
        return `${this.title} ${this.first_name} ${this.last_name}`;
      } else {
        return this.email;
      }
    },
  },
  specialty: String,
  about: String,
  avatar: String,
  cloudinary_id: String,
  visiting_hours: {
    type: Map,
    of: new mongoose.Schema(
      {
        open: { type: String },
        close: { type: String },
      },
      { _id: false }
    ),
    default: {},
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
