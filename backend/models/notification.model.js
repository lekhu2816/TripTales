import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, default: "" },
    fileType: { type: String, enum: ["image", "video"] },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);


export const notificationModel=mongoose.model('Notification',notificationSchema)