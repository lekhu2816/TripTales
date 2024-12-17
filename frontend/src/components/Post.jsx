import React, { useContext, useState, useRef } from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Post = ({ postData }) => {
  const {SERVER_URL, setShowPostDialog, setPostDropdown, userData } =
    useContext(AppContext);
  const onClickHandle = () => {
    setShowPostDialog({
      show: true,
      postData,
    });
  };

  // -----------------handle post dropdown--------------------------//

  const onHandlePostDropdown = (postId, userId) => {
    setPostDropdown({
      show: true,
      postId: postId,
      userId: userId,
    });
  };

  //-------------------Handle Video controls------------------------//

  const videoRef = useRef(null); // Reference to the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause
  const [isMuted, setIsMuted] = useState(true); // State to track mute/unmute

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ---------onComment change---------//

  const [text, setText] = useState("");

  const onCommentChangeHandle = (event) => {
    const value = event.target.value;
    if (value.trimStart()) {
      setText(value);
    }
    else{
      setText("")
    }
  };

  //----------------------add comment-------------------//

  const addComment = async () => {
    const postId = postData._id;
    const url=`${SERVER_URL}/api/post/add-comment/${postId}`
    try {
     const response=await axios.post(url,{text},{withCredentials:true})
     if(response.status==200){
      toast.success(response.data.message,{
        position:"bottom-right"
      })
     }
    } catch (error) {
      if(error.status==400||error.status==500){
        toast.error(response.data.message,{
          position:"bottom-right"
        })
      }
    }
    setText("")
  };

  return (
    <div className="p-2 flex flex-col gap-2 mobile:p-0">
      {/*---------section top---------- */}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={postData.author.profilePhoto}
            alt=""
          />
          <p className="text-sm font-medium">{postData.author.userName}</p>
        </div>
        <div
          onClick={() =>
            onHandlePostDropdown(postData._id, postData.author._id)
          }
          className="cursor-pointer"
        >
          <i className="material-icons">more_horiz</i>
        </div>
      </div>

      {/* -----------section image and videos----- */}

      <div className="relative">
        {postData.fileType == "image" ? (
          <img src={postData.image} alt="Post content" className="media" />
        ) : (
          <div>
            <video
              ref={videoRef}
              src={postData.image}
              className="media cursor-pointer"
              muted={isMuted}
              onClick={togglePlayPause}
            />

            {/* Controls */}

            <div className="rounded-full bg-opacity-30 w-8 h-8 flex justify-center items-center bg-black  absolute bottom-1 left-2 text-white text-lg">
              <i
                onClick={togglePlayPause}
                className={` fa-solid ${isPlaying ? "fa-pause" : "fa-play"}  `}
              ></i>
            </div>

            <div className="rounded-full bg-opacity-30 w-8 h-8 flex justify-center items-center bg-black  absolute top-1 right-2 text-white text-sm">
              <i
                onClick={toggleMute}
                className={` fa-solid ${
                  isMuted ? "fa-volume-off" : "fa-volume-low"
                }   `}
              ></i>
            </div>
          </div>
        )}
      </div>

      {/* ----------------like and comments------------------- */}

      <div className="flex justify-between text-sm text-gray-600">
        <p>{postData.likes.length} Likes</p>
        <p>{postData.comment.length} Comments</p>
      </div>
      <hr />

      {/*---------section bottom for like comment and-------------- */}

      <div className="flex justify-between mobile:text-xl">
        <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
          <i className="fa-regular fa-heart"></i>
          <p className="text-sm font-medium mobile:hidden ">Like</p>
        </div>
        <div
          onClick={() => onClickHandle()}
          className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200"
        >
          <i className="fa-regular fa-comment"></i>
          <p className="text-sm font-medium mobile:hidden">Comment</p>
        </div>
        <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
          <i className="fa-regular fa-share-from-square"></i>
          <p className="text-sm font-medium mobile:hidden">Share</p>
        </div>
        <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
          <i className="fa-regular fa-bookmark"></i>
          <p className="text-sm font-medium mobile:hidden">Bookmark</p>
        </div>
      </div>
      <hr />

      {/* ------------------------caption------------------- */}

      <div className="text-sm">{postData.caption}</div>

      {/* -----------------Add comment---------------------- */}

      <div className="flex gap-2 items-center">
        <img
          className="w-6 h-6 rounded-full"
          src={userData.profilePhoto}
          alt=""
        />
        <div className="flex items-center border border-black w-full  rounded-full text-sm">
          <input
            onChange={onCommentChangeHandle}
            className="rounded-full outline-none w-full px-2 py-1"
            type="text"
            value={text}
            placeholder="Add comment"
          />
          {text ? (
            <p onClick={addComment} className="cursor-pointer bg-gray-200 py-1 px-2 rounded-r-full text-gray-800">
              Comment
            </p>
          ) : (
            <p className="bg-gray-200 py-1 px-2 rounded-r-full text-gray-400">
              Comment
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
