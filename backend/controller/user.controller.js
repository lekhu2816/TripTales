import { userModel } from "../models/user.model.js";
import fs from "fs";
import {
  uploadToCloudnaryMultiple,
  uploadToCloudnarySingle,
} from "../utils/cloudinary.js";

// ----------------------get profile------------------------//

const getProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModel
      .findById(id)
      .select("_id name userName profilePhoto coverPhoto bio gender");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesn't exist",
      });
    }
    return res.status(200).json({
      user,
      success: true,
      message: "userInfo send successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// ----------------------edit cover photo-----------------//

const editCoverPhoto = async (req, res) => {
  const { id } = req.user;
  const file = req.file;
  try {
    if (!file) {
      res.status(400).json({
        success: false,
        message: "Image required",
      });
    }

    const { url } = await uploadToCloudnarySingle(file);
    await userModel.findByIdAndUpdate(id, { coverPhoto: url });
    fs.unlink(file.path, (error) => {
      if (!error) {
        console.log("Deleted Successfully");
      }
    });
    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating coverPhoto",
    });
  }
};

// ----------------------edit profile photo-----------------//

const editProfilePhoto = async (req, res) => {
  const { id } = req.user;
  const file = req.file;
  try {
    if (!file) {
      res.status(400).json({
        success: false,
        message: "Image required",
      });
    }
    const { url } = await uploadToCloudnarySingle(file);
    fs.unlink(file.path, (error) => {
      if (!error) {
        console.log("Deleted Successfully");
      }
    });
    await userModel.findByIdAndUpdate(id, { profilePhoto: url });
    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating profilePhoto",
    });
  }
};

// ----------------------edit profile -----------------//

const editProfile = async (req, res) => {
  const { id } = req.user;
  const { userName, bio, gender } = req.body;
  try {
    if (!userName || !bio || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    await userModel.findByIdAndUpdate(id, {
      userName: userName,
      bio: bio,
      gender: gender,
    });
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating profilePhoto",
    });
  }
};

export { getProfile, editProfile, editProfilePhoto, editCoverPhoto };
