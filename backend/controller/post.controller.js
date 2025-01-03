import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import { commentModel } from "../models/comment.model.js";
import { uploadToCloudnarySingle } from "../utils/cloudinary.js";
import fs from "fs";

// -------------------Create post---------------------------------//

const createPost = async (req, res) => {
  const { id } = req.user;
  const file = req.file;
  const { caption, tag } = req.body;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: "file is required",
    });
  }

  const response = await uploadToCloudnarySingle(file, 400, 400);
  fs.unlink(file.path, (error) => {
    if (!error) {
      console.log("Deleted Successfully");
    }
  });

  if (!response) {
    return res.status(400).json({
      success: false,
      message: "cannot upload post",
    });
  }
  const { url, fileType } = response;
  const post = new postModel({
    caption: caption,
    tag: tag,
    image: url,
    fileType: fileType,
    author: id,
  });
  let newPost = await post.save();
  newPost = await newPost.populate({
    path: "author",
    select: "profilePhoto userName",
  });

  const user = await userModel.findById(id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user not found",
    });
  } else {
    user.posts.push(newPost._id);
    await user.save();
  }
  res.status(200).json({
    success: true,
    message: "Post Created successfully",
    newPost,
  });
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating post",
    });
  }
};

// ------------------------get all post-----------------------------//

const getPost = async (req, res) => {
  try {
    let { page = 0, limit = 10 } = req.query;
    page=parseInt(page)
    limit=parseInt(limit)
    const posts = await postModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(page*limit)
      .limit(limit)
      .populate({ path: "author", select: "profilePhoto userName" });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting post",
    });
  }
};

// -------------------------get user post---------------------------//

const getUserPost = async (req, res) => {
  const id = req.params.id;
  const user = await userModel
    .findById(id)
    .select("posts")
    .populate({ path: "posts" });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User Not found",
    });
  }
  res.status(200).json({
    success: true,
    posts: user.posts,
  });
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting userpost",
    });
  }
};

// -------------------------getPostById-----------------------------------//

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id).populate({
      path: "author",
      select: "userName profilePhoto",
    });
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "post not found",
      });
    }
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting post",
    });
  }
};

// ---------------------------Like post----------------------------------//

const likePost = async (req, res) => {
  try {
    const { id } = req.user;
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Post not found",
      });
    }
    await postModel.findByIdAndUpdate(postId, { $addToSet: { likes: id } });

    // --------------socket to implement notification---

    return res.status(200).json({
      success: true,
      message: "Post liked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while Liking post",
    });
  }
};

//-----------------------Dislike post----------------------//

const dislikePost = async (req, res) => {
  try {
    const { id } = req.user;
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(200).json({
        success: false,
        message: "Post not found",
      });
    }
    await postModel.findByIdAndUpdate(postId, { $pull: { likes: id } });

    // --------------socket to implement notification---

    return res.status(200).json({
      success: true,
      message: "Post disliked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while Liking post",
    });
  }
};

// ----------------------Adding comment--------------------//

const addComment = async (req, res) => {
  try {
    const { id } = req.user;
    const postId = req.params.id;
    const { text } = req.body;
    const post = await postModel.findById(postId);
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }
    const newComment = new commentModel({
      text,
      author: id,
      post: postId,
    });
    const comment = await newComment.save();
    post.comment.push(comment._id);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding comment",
    });
  }
};

// ---------------get post comment-------------------------------//

const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postComment = await postModel
      .findById(postId)
      .select("comment")
      .populate({
        path: "comment",
        populate: {
          path: "author",
          select: "userName profilePhoto ",
        },
      });
    return res.status(200).json({
      success: true,
      comment: postComment.comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting comment",
    });
  }
};

// -----------------------delete post----------------------------------//

const deletePost = async (req, res) => {
  try {
    const { id } = req.user;
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "post is not found",
      });
    }
    if (post.author.toString() != id) {
      return res.status(400).json({
        success: false,
        message: "unauthorize user",
      });
    }

    await postModel.findByIdAndDelete(postId);
    let user = await userModel.findById(id);
    user.posts = user.posts.filter((id) => id.toString() != postId);
    await user.save();

    //delete related comments
    await commentModel.deleteMany({ post: postId });

    res.status(200).json({
      success: true,
      message: "post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting post",
    });
  }
};

// -----------------------bookmark post-------------------------------//

const bookmarkPost = async (req, res) => {
  try {
    const { id } = req.user;
    const postId = req.params.id;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: true,
        message: "post not found",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: true,
        message: "user not found",
      });
    }
    if (user.bookmarks.includes(postId)) {
      await user.updateOne({ $pull: { bookmarks: postId } });
      await user.save();
      return res.status(200).json({
        success: true,
        message: "remove from bookmark",
      });
    } else {
      user.bookmarks.push(postId);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Added to bookmark",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while bookmark post",
    });
  }
};


// -------------------------Explore posts-----------------------------//

const explorePost=async(req,res)=>{
 try {
  let {tag,page=0,limit=10}=req.query;
  tag=JSON.parse(tag)
  page=parseInt(page)
  limit=parseInt(limit)

  if(!tag){
    const posts=await postModel.find({}).limit(limit).skip(limit*page)
    return res.status(200).json({
      success:true,
      posts
    })
  }
  else{
    const posts=await postModel.find({tag:tag}).limit(limit).skip(limit*page)
    return res.status(200).json({
      success:true,
      posts
    })
  }

 } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while exploring post",
    });
 }
}

export {
  createPost,
  getPost,
  getUserPost,
  getPostById,
  likePost,
  dislikePost,
  addComment,
  getCommentOfPost,
  deletePost,
  bookmarkPost,
  explorePost
};
