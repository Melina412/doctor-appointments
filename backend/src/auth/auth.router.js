import express from 'express';
import {
  login,
  register,
  check,
  logout,
  getUserinfo,
  refreshToken,
  verifyReviewCode,
} from './auth.controller.js';
import {
  checkToken,
  checkRefreshToken,
  checkReviewToken,
} from '../middleware/auth.middleware.js';

export const router = new express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/check', checkToken, check);
router.get('/check/review', checkReviewToken, check);
router.get('/logout', logout);
router.get('/userinfo', checkToken, getUserinfo);
router.get('/refresh', checkRefreshToken, refreshToken);
router.post('/verify-code', verifyReviewCode);
