import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js';
import generateUsingAI from '../controller/ai.controller.js';
const AIRouter=express.Router();

AIRouter.get('/generate',authMiddleware,generateUsingAI)

export default AIRouter