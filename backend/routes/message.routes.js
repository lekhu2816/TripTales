import express from "express";
import upload from "../utils/multer.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import { get } from "mongoose";


const messageRouter=express.Router();

messageRouter.post('/send/:id',authMiddleware,sendMessage);
messageRouter.get('/get/:id',authMiddleware,getMessage);

export default messageRouter