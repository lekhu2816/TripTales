import express from "express";
import upload from "../utils/multer.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addComment,
  bookmarkPost,
  createPost,
  deletePost,
  dislikePost,
  getCommentOfPost,
  getPost,
  getUserPost,
  likePost,
} from "../controller/post.controller.js";
const postRoute = express.Router();

postRoute.post("/create", authMiddleware, upload.single("image"), createPost);
postRoute.get("/get-all",authMiddleware, getPost);
postRoute.get("/getuserPost", authMiddleware, getUserPost);
postRoute.post("/like/:id", authMiddleware, likePost);
postRoute.post("/dislike/:id", authMiddleware, dislikePost);
postRoute.post('/add-comment/:id',authMiddleware,addComment)
postRoute.get('/get-comment/:id',getCommentOfPost);
postRoute.delete('/delete-post/:id',authMiddleware,deletePost);
postRoute.post('/bookmark/:id',authMiddleware,bookmarkPost)

export default postRoute;
