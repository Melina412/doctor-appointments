import express from 'express';
import {
  login,
  register,
  check,
  logout,
  getUserinfo,
  refreshToken,
} from './auth.controller.js';
import { checkToken } from '../middleware/auth.middleware.js';

export const router = new express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/check', checkToken, check);
router.get('/logout', logout);
router.get('/userinfo', checkToken, getUserinfo);
router.get('/refresh-token', checkToken, refreshToken);
