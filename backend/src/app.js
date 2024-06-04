import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import './config/storage.config.js';

import { router as authRouter } from './auth/auth.router.js';
import { router as doctorRouter } from './doctors/doctor.router.js';
import { router as userRouter } from './users/user.router.js';
import { router as appointmentRouter } from './appointments/appointments.router.js';

export const app = express();

app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('images', express.static('./images'));

app.use('/api/auth', authRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/appointments', appointmentRouter);
