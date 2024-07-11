import express from 'express';
import { getDoctors } from './doctor.controller.js';

export const router = new express.Router();

router.get('/', getDoctors);
