import express from 'express';
import { getDaysPerMonth, getTimeSlots } from './appointments.controller.js';

export const router = new express.Router();

router.get('/days', getDaysPerMonth);
router.get('/timeslots', getTimeSlots);
