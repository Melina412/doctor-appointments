import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import { router as authRouter } from './auth/auth.router.js';
import { router as doctorRouter } from './doctors/doctor.router.js';

await mongoose.connect(process.env.MONGODB);

export const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/doctors', doctorRouter);
