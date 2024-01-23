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

test('createSalt should create a 24 character hex encoded string', () => {
  const str = createSalt();

  const hexStr = (str) => {
    const regex = /^[0-9a-fA-F]+$/;
    return str.length === 24 && regex.test(str);
  };

  expect(hexStr(str)).toBe(true);
});

test('createHash should use sha256 algorithm to create a 66 character hashed pw', () => {
  const password = 'testpassword';
  const salt = createSalt();
  const hash = createHash(password, salt);

  const hashStr = (hash) => {
    const regex = /^[0-9a-fA-F]+$/;
    return hash.length === 64 && regex.test(hash);
  };

  expect(hashStr(hash)).toBe(true);
});
