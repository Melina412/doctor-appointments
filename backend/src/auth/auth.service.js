import jwt from 'jsonwebtoken';
import { createHmac, randomBytes } from 'node:crypto';

export function createToken(type, payload) {
  if (type === 'access')
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  if (type === 'refresh')
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  if (type === 'review')
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // console.log('verifyToken failed:', error.message);
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

export function createSecret(digits) {
  // für jwt secret 12 bytes
  const secret = randomBytes(digits).toString('hex');
  // console.log('new secret created:', `JWT_SECRET=${secret}`);

  // diese funktion kann auch für den review link benutzt werden!
  // eig. ist create hash auch schon das gleiche

  // console.log({ secret });
  return secret;
}

export function createNumericalCode(digits) {
  const bytes = randomBytes(Math.ceil(digits / 2));
  const code = parseInt(bytes.toString('hex'), 16).toString().slice(0, digits);
  // console.log({ code });
  return code;
}
