import { verifyToken } from '../auth/auth.service.js';

export function checkToken(req, res, next) {
  const token = req.cookies.doctorauth;
  try {
    req.payload = verifyToken(token);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
}
