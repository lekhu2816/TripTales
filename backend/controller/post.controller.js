import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";

// -------------------Create post---------------------------------//

const createPost = async (req, res) => {
  const { id } = req.user;
  try {
  } catch (error) {}
};

// ------------------------get all post-----------------------------//

const getPost = async (req, res) => {
  try {
  } catch (error) {}
};

// -------------------------get user post---------------------------//

const getUserPost = async (req, res) => {
  const { id } = req.user;
  try {
  } catch (error) {}
};

export { createPost, getPost, getUserPost };
