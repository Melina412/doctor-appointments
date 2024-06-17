import express from 'express';
import { upload } from '../config/storage.config.js';
import { checkToken } from '../middleware/auth.middleware.js';
import { addImage, editProfile, profileData } from './user.controller.js';

export const router = new express.Router();

router.post('/profile', checkToken, profileData);
router.put('/edit', checkToken, upload.none(), editProfile);
router.put('/image', checkToken, upload.single('avatar'), addImage);
