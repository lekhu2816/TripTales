import express from 'express'
import upload from '../utils/multer.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { createPost, getPost, getUserPost } from '../controller/post.controller.js';
const postRoute=express.Router();


postRoute.post('/create',authMiddleware,upload.single('image'),createPost);
postRoute.get('/get-all',getPost)
postRoute.get('/getuserPost',authMiddleware,getUserPost)

export default postRoute