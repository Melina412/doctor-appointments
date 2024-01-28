import { Doctor } from '../doctors/doctor.model.js';
import { createSalt, createHash, createToken } from './auth.service.js';

export async function register(req, res) {
  // console.log('req.body:', req.body);
  try {
    const { email, password, name, specialty, about, avatar, visiting_hours } =
      req.body;

    // erst checken ob Doctor schon existiert
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: 'email already exists in db' });
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
    res.status(201).json({ success: true, message: 'new user added to db' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
}

export async function login(req, res) {
  const { email } = req.body;
  // console.log({ email });

  try {
    const user = await Doctor.findOne({ email });
    // console.log({ user });
    if (!user) return res.status(401).json({ message: 'login failed' }).end();

    if (user.password !== createHash(req.body.password, user.salt))
      return res.status(401).json({ message: 'login failed' }).end();

    const payload = { user: user._id, username: user.name, email: user.email };
    const token = createToken(payload);

    res.cookie('doctorauth', token, {
      httpOnly: true,
      secure: true,
    });

    res.json({
      message: 'login successful',
      data: { username: user.name, email: user.email },
    });

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

// diese funktion nutzt der client für die protector route!
export function check(_, res) {
  res.end();
}

export function logout(req, res) {
  const cookie = req.cookies.doctorauth;
  // console.log('cookie:', { doctorauth: cookie });

  res.clearCookie('doctorauth');
  res.json({
    message: 'logout successful',
  });
}

export function getUserinfo(req, res) {
  const { username, email, exp } = req.payload;
  // console.log('req.payload:', req.payload);
  res.json({
    username,
    email,
    expiresCET: new Date(exp * 1000).toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
    }),
  });
  // expiresCET nur als info für mich damit ich sehe wann der token abläuft
}

export async function refreshToken(req, res) {
  const { email } = req.payload.email;
  // console.log({ email }, 'refresh token');

  try {
    const user = await Doctor.findOne({ email });
    // console.log({ user });
    if (!user) return res.status(401).json({ message: 'user not found' }).end();

    if (user.password !== createHash(req.body.password, user.salt))
      return res.status(401).json({ message: 'auth failed' }).end();

    const payload = { user: user._id, username: user.name, email: user.email };
    const token = createToken(payload);

    res.cookie('doctorauth', token, {
      httpOnly: true,
      secure: true,
    });

    res.json({
      sucess: true,
      message: 'token refreshed',
      data: { username: user.name, email: user.email },
    });

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
