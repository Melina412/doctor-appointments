import express from 'express';
import { getDoctors } from './doctor.controller.js';
import { checkToken } from '../middleware/auth.middleware.js';

export const router = new express.Router();

router.get('/', getDoctors);
