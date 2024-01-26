import express from 'express';
import { getDaysPerMonth } from './appointments.controller.js';

export const router = new express.Router();

// router.post('/', getDaysPerMonth);
router.get('/', getDaysPerMonth);
