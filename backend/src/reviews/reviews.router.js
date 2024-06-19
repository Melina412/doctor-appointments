import express from 'express';
// import { checkToken } from '../middleware/auth.middleware.js';
import { enableReview, postReview } from './reviews.controller.js';

export const router = new express.Router();

router.put('/enable', enableReview);
router.post('/', postReview);
