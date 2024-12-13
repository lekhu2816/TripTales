import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    coverPhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/dlkex5mge/image/upload/v1733920004/coverPic_cpjxlq.jpg",
    },
    profilePhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/dlkex5mge/image/upload/v1733919894/userLogo_haalu6.png",
    },
    bio: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female"] },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: "gallery" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
