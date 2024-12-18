import { userModel } from "../models/user.model.js";
import fs from "fs";
import {
  uploadToCloudnarySingle,
} from "../utils/cloudinary.js";

// ----------------------get profile------------------------//

const getProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModel
      .findById(id)
      .select("_id name userName profilePhoto coverPhoto bio gender bookmarks following");
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

    const { url } = await uploadToCloudnarySingle(file, 1280, 720);
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
    const { url } = await uploadToCloudnarySingle(file, 600, 600);
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

// -----------------------------Get  suggested user---------------------//

const getSuggestedUser = async (req, res) => {
  const { id } = req.user;
  try {
    const suggestedUser = await userModel
      .find({ _id: { $ne: id } })
      .select("_id name userName profilePhoto");
    res.status(200).json({
      success: true,
      suggestedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting suggested user",
    });
  }
};

// ------------------------------follow and unfollow---------------//

const followAndUnfollow = async (req, res) => {
  const followerUser = req.user.id; //lekhu
  const followingToUser = req.params.id; //Himanshu
  try {
    if (followerUser == followingToUser) {
      return res.status(400).json({
        success: false,
        message: "Cannot follow/unfollow Youself",
      });
    }
    const user = await userModel.findById(followerUser);
    const targetUser = await userModel.findById(followingToUser);
    if (!user || !targetUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isFollowing = user.following.includes(followingToUser);
    if (isFollowing) {
      const response = await Promise.all([
        userModel.updateOne(
          { _id: followerUser },
          { $pull: { following: followingToUser } }
        ),
        userModel.updateOne(
          { _id: followingToUser },
          { $pull: { followers: followerUser } }
        ),
      ]);

      res.status(200).json({
        success: true,
        message: "Unfollowed Successfully",
      });
    } else {
      const response = await Promise.all([
        userModel.updateOne(
          { _id: followerUser },
          { $push: { following: followingToUser } }
        ),
        userModel.updateOne(
          { _id: followingToUser },
          { $push: { followers: followerUser } }
        ),
      ]);

      res.status(200).json({
        success: true,
        message: "followed Successfully",
      });
    }
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: "Error while follow and unfollow",
    });
  }
};


// --------------------------Get user by id--------------------------//
const getUserById=async(req,res)=>{
  try {
    const id=req.params.id
    const user= await userModel.findById(id).select(' name userName profilePhoto coverPhoto bio following followers posts')
    if(!user){
       return res.status(400).json({
        success:false,
        message:"User not found"
       })
    }
    res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while follow and unfollow",
    });
  }
}


export {
  getProfile,
  editProfile,
  editProfilePhoto,
  editCoverPhoto,
  getSuggestedUser,
  followAndUnfollow,
  getUserById
};
