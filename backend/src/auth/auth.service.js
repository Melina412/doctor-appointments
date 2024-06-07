import jwt from 'jsonwebtoken';
import { createHmac, randomBytes } from 'node:crypto';

export function createToken(type, payload) {
  if (type === 'access')
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  if (type === 'refresh')
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log('verifyToken failed:', error.message);
    throw error;
  }
}

export function createHash(password, salt) {
  const hmac = createHmac('sha256', salt);
  hmac.update(password);
  return hmac.digest('hex');
}

export function createSalt() {
  return randomBytes(12).toString('hex');
}

// diese funktion brauche ich nur einmal um ein jwt secret zu generieren
export function createSecret() {
  const jwtSecret = randomBytes(12).toString('hex');
  // console.log('new secret created:', `JWT_SECRET=${jwtSecret}`);
}
