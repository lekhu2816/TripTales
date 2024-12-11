import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  editCoverPhoto,
  editProfile,
  editProfilePhoto,
  getProfile,
} from "../controller/user.controller.js";
import upload from "../utils/multer.js";
const userRoute = express.Router();

userRoute.get("/get-profile", authMiddleware, getProfile);
userRoute.patch(
  "/update-profilePhoto",
  authMiddleware,
  upload.single("image"),
  editProfilePhoto
);
userRoute.patch(
  "/update-coverPhoto",
  authMiddleware,
  upload.single("image"),
  editCoverPhoto
);

userRoute.patch("/update-profile", authMiddleware, editProfile);
export default userRoute;
