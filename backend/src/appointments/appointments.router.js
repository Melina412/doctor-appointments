import express from 'express';
import {
  getDaysPerMonth,
  getTimeSlots,
  requestAppointment,
} from './appointments.controller.js';
import { upload } from '../config/storage.config.js';

export const router = new express.Router();

router.get('/days', getDaysPerMonth);
router.get('/timeslots', getTimeSlots);
router.post('/request', upload.none(), requestAppointment);
