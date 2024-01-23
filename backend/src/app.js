import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { router as authRouter } from './auth/auth.router.js';
import { router as doctorRouter } from './doctors/doctor.router.js';
import { router as userRouter } from './user/user.router.js';

await mongoose.connect(process.env.MONGODB);

export const app = express();

app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('images', express.static('./images'));

app.use('/api/auth', authRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/user', userRouter);
