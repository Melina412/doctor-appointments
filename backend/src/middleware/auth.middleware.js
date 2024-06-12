import { verifyToken } from '../auth/auth.service.js';

export function checkToken(req, res, next) {
  const token = req.cookies.a_doctorauth;
  token
    ? console.log('checkToken: ✅', token.slice(-5))
    : console.log('checkToken: ❌, no access token');
  try {
    req.payload = verifyToken(token);
    // console.log('access token payload:', req.payload);
    next();
  } catch (error) {
    console.log('checkToken: ❌', error.message);
    res.status(401).end();
  }
}

export function checkRefreshToken(req, res, next) {
  const token = req.cookies.r_doctorauth;
  token
    ? console.log('checkRefreshToken: ✅', token.slice(-5))
    : console.log('checkRefreshToken: ❌, no refresh token');
  try {
    req.payload = verifyToken(token);
    // console.log('refresh token payload:', req.payload);
    next();
  } catch (error) {
    console.log('checkRefreshToken: ❌', error.message);
    res.status(401).end();
  }
}
