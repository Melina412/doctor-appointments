import 'dotenv/config';
import jwt from 'jsonwebtoken';
import {
  createToken,
  verifyToken,
  createHash,
  createSalt,
} from '../../src/auth/auth.service.js';

test('createToken should create a JWT token', () => {
  const token = createToken({ user: 'testuser' });
  expect(token).toBeTruthy();
});

test('verifyToken should verify the expected claims', () => {
  const payload = { user: 'testuser' };
  const token = createToken(payload);
  const decoded = verifyToken(token);

  expect(decoded.user).toBe(payload.user);
});
