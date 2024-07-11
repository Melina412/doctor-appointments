import express from 'express';
import { enableReview, addReview } from './reviews.controller.js';
import { checkReviewToken, checkToken } from '../middleware/auth.middleware.js';

export const router = new express.Router();

router.put('/enable', checkToken, enableReview);
router.post('/add', checkReviewToken, addReview);
