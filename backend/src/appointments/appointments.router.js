import express from 'express';
import {
  confirmAppointment,
  getAppointments,
  getDaysPerMonth,
  getTimeSlots,
  requestAppointment,
} from './appointments.controller.js';
import { upload } from '../config/storage.config.js';
import { checkToken } from '../middleware/auth.middleware.js';

export const router = new express.Router();

router.get('/days', getDaysPerMonth);
router.get('/timeslots', getTimeSlots);
router.get('/', checkToken, getAppointments);
router.post('/request', upload.none(), requestAppointment);
router.put('/confirm', checkToken, confirmAppointment);
