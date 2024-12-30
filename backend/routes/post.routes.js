import express from "express";
import upload from "../utils/multer.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addComment,
  bookmarkPost,
  createPost,
  deletePost,
  dislikePost,
  explorePost,
  getCommentOfPost,
  getPost,
  getPostById,
  getUserPost,
  likePost,
} from "../controller/post.controller.js";
const postRoute = express.Router();

postRoute.post("/create", authMiddleware, upload.single("image"), createPost);
postRoute.get("/get-all",authMiddleware, getPost);
postRoute.get("/getuserPost/:id", authMiddleware, getUserPost);
postRoute.get("/get-post/:id",authMiddleware,getPostById)
postRoute.post("/like/:id", authMiddleware, likePost);
postRoute.post("/dislike/:id", authMiddleware, dislikePost);
postRoute.post('/add-comment/:id',authMiddleware,addComment)
postRoute.get('/get-comment/:id',getCommentOfPost);
postRoute.delete('/delete-post/:id',authMiddleware,deletePost);
postRoute.post('/bookmark/:id',authMiddleware,bookmarkPost)
postRoute.get('/explore-post',authMiddleware,explorePost)

export default postRoute;
