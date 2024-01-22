import jwt from 'jsonwebtoken';
import { createHmac, randomBytes } from 'node:crypto';

export function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5min' });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function createHash(password, salt) {
  const hmac = createHmac('sha256', salt);
  hmac.update(password);
  return hmac.digest('hex');
}

export function createSalt() {
  return randomBytes(12).toString('hex');
}

export function createSecret() {
  const jwtSecret = randomBytes(12).toString('hex');
  console.log('new secret created:', `JWT_SECRET=${jwtSecret}`);
}
