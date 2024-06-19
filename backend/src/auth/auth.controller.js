import { Doctor } from '../doctors/doctor.model.js';
import { createSalt, createHash, createToken } from './auth.service.js';

//$ register() ---------------------------------------------------------------

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

//$ login() ---------------------------------------------------------------

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
    const accessToken = createToken('access', payload);
    const refreshToken = createToken('refresh', payload);

    res.cookie('a_doctorauth', accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.cookie('r_doctorauth', refreshToken, {
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
//$ check() ---------------------------------------------------------------
// diese funktion nutzt der client für die protector route!
// der eigentliche check passiert durch die middleware
// ich kann also diese funktion mehrfach benutzen,
// aber wenn ich eine andere middleware nehme dann muss ich auch eine andere api route erstellen!
export function check(req, res) {
  const payload = req.payload;
  res.json(payload.exp);
  res.end();
}

//$ logout() ---------------------------------------------------------------

export function logout(req, res) {
  const accessCookie = req.cookies.a_doctorauth;
  const refreshCookie = req.cookies.r_doctorauth;
  // console.log('cookie:', { doctorauth: cookie });

  res.clearCookie('a_doctorauth');
  res.clearCookie('r_doctorauth');
  res.json({
    message: 'logout successful',
  });
}

//$ getUserInfo() ---------------------------------------------------------------

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

//$ refreshToken() ---------------------------------------------------------------

export async function refreshToken(req, res) {
  const { email } = req.payload;
  console.log({ email }, 'refresh token payload');

  try {
    const user = await Doctor.findOne({ email });
    // console.log({ user });
    if (!user) {
      console.log('user not found during refresh');
      return res.status(401).json({ message: 'user not found' }).end();
    }

    const payload = { user: user._id, username: user.name, email: user.email };
    const accessToken = createToken('access', payload);

    res.cookie('a_doctorauth', accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.json({
      sucess: true,
      message: 'token refreshed',
      data: { username: user.name, email: user.email },
    });
  } catch (error) {
    console.log('error in refreshToken:', error);
    res.status(500).end();
  }
}

//$ verifyReviewCode() ---------------------------------------------------------------

export async function verifyReviewCode(req, res) {
  const { codeInput, path } = req.body;

  try {
    const review = await Review.findOne({ 'auth.path': path });
    if (review) {
      if (!codeInput === review.auth.code)
        return res
          .status(401)
          .json({ message: 'code verification failed' })
          .end();

      const payload = { review: review._id };
      const reviewToken = createToken('review', payload);

      res.cookie('rev_doctorauth', reviewToken, {
        httpOnly: true,
        secure: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
