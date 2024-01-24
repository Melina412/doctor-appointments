import { Doctor } from '../doctors/doctor.model.js';
import { uploadImage, deleteImage } from './user.service.js';

export async function profileData(req, res) {
  console.log('req.payload von getProfileData:', req.payload);

  const user_id = req.payload.user;

  try {
    const user = await Doctor.findById(user_id)
      .select({
        password: 0,
        salt: 0,
        __v: 0,
      })
      .exec();
    console.log({ user });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function editProfile(req, res) {
  console.log('req.payload von editProfile:', req.payload);
  console.log('req body:', req.body);

  const user_id = req.payload.user;
  const {
    title,
    firstName,
    lastName,
    specialty,
    about,
    Mon_open,
    Mon_close,
    Tue_open,
    Tue_close,
    Wed_open,
    Wed_close,
    Thu_open,
    Thu_close,
    Fri_open,
    Fri_close,
    Sat_open,
    Sat_close,
    Sun_open,
    Sun_close,
  } = req.body;

  const visitingHours = {
    Mon: { open: Mon_open, close: Mon_close },
    Tue: { open: Tue_open, close: Tue_close },
    Wed: { open: Wed_open, close: Wed_close },
    Thu: { open: Thu_open, close: Thu_close },
    Fri: { open: Fri_open, close: Fri_close },
    Sat: { open: Sat_open, close: Sat_close },
    Sun: { open: Sun_open, close: Sun_close },
  };

  try {
    const user = await Doctor.findById(user_id).exec();
    console.log({ user });
    const query = { _id: user_id };

    if (user) {
      const updateResult = await Doctor.updateOne(query, {
        $set: {
          title,
          first_name: firstName,
          last_name: lastName,
          specialty,
          about,
          visiting_hours: visitingHours,
        },
      });
      if (updateResult.modifiedCount > 0) {
        const updatedUser = await Doctor.findById(user_id).exec();
        console.log({ updatedUser });
        res
          .status(201)
          .json({ success: true, message: 'user data updated in db' });
      } else {
        res.status(404).json({ success: false, message: 'user not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log({ error });
  }
}

export async function addImage(req, res) {
  const user_id = req.payload.user;

  try {
    const user = await Doctor.findById(user_id).exec();
    console.log({ user });
    const query = { _id: user_id };

    if (user) {
      try {
        const cloudinaryResult = await uploadImage(req.file.buffer);
        const avatar = cloudinaryResult.secure_url;
        const cloudinary_id = cloudinaryResult.public_id;

        const updateResult = await Doctor.updateOne(query, {
          $set: {
            avatar,
            cloudinary_id,
          },
        });
        //

        if (updateResult.modifiedCount > 0) {
          const updatedUser = await Doctor.findById(user_id).exec();
          console.log({ updatedUser });
          res.status(201).json({
            success: true,
            message: 'user avatar saved to db',
            secure_url: avatar,
            public_id: cloudinary_id,
          });
        }
        //
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
      //
    } else {
      res.status(404).json({ success: false, message: 'user not found' });
    }
    //
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
