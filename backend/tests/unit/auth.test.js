import 'dotenv/config';
import jwt from 'jsonwebtoken';
import {
  createToken,
  verifyToken,
  createHash,
  createSalt,
} from '../../src/auth/auth.service.js';

test('should create a JWT token', () => {
  const token = createToken({ user: 'testuser' });
  expect(token).toBeTruthy();
});

test('JWT token should have expected claims', () => {
  const payload = { user: 'testuser' };
  const token = createToken(payload);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  expect(decoded.user).toBe(payload.user);
});
