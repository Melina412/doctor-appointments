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

export function checkReviewToken(req, res, next) {
  const token = req.cookies.rev_doctorauth;
  token
    ? console.log('checkReviewToken: ✅', token.slice(-5))
    : console.log('checkReviewToken: ❌, no review token');
  try {
    req.payload = verifyToken(token);
    // console.log('review token payload:', req.payload);
    next();
  } catch (error) {
    console.log('checkReviewToken: ❌', error.message);
    res.status(401).end();
  }
}

// respondes with 204 if no user is logged in
export function checkUserLogin(req, res, next) {
  const token = req.cookies.a_doctorauth;
  if (!token) {
    res.status(204).end();
  }
  try {
    token
      ? console.log('checkUserLogin: ✅', token.slice(-5))
      : console.log('checkUserLogin: ❌, no access token');
    req.payload = verifyToken(token);
    // console.log('access token payload:', req.payload);
    next();
  } catch (error) {
    console.log('checkUserLogin: ❌', error.message);
    res.status(401).end();
  }
}
