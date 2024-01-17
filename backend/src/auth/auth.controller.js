import { Doctor } from '../doctors/doctor.model.js';
import { createSalt, createHash, createToken } from './auth.service.js';

export async function register(req, res) {
  console.log('req.body:', req.body);
  try {
    const { email, password, name, specialty, about, avatar, visiting_hours } =
      req.body;

    // erst checken ob Doctor schon existiert
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'email already exists in db' });
    }

    const salt = createSalt();
    const hashedPassword = createHash(password, salt);

    const newDoctor = new Doctor({
      email,
      password: hashedPassword,
      salt,
      name,
      specialty,
      about,
      avatar,
      visiting_hours,
    });

    await newDoctor.save();
    res.status(201).end();
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
}

export async function login(req, res) {
  const { email } = req.body;
  console.log({ email });

  try {
    const user = await Doctor.findOne({ email });
    console.log({ user });
    if (!user) return res.status(401).end();

    if (user.password !== createHash(req.body.password, user.salt))
      return res.status(401).end();

    const token = createToken({ user: user._id });

    res
      .cookie('doctorLoginAuth', token, {
        httpOnly: true,
        secure: true,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
