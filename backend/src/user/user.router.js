import express from 'express';
import multer from 'multer';
import { checkToken } from '../middleware/auth.middleware.js';
import { editProfile, profileData } from './user.controller.js';

export const router = new express.Router();
const upload = multer({ dest: './images' });

router.post('/profile', checkToken, profileData);
router.put('/edit', checkToken, upload.none(), editProfile);
