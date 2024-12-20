import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/Context";
import profile from "../assets/profile.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader3 } from "./Loader";

const PostDialog = () => {
  const { SERVER_URL, showPostDialog, setShowPostDialog, logout, userData } =
    useContext(AppContext);

  const [postInfo, setPostInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  //-------------------------------Getting post information------------------//

  const getPostInfo = async () => {
    const postId = showPostDialog.postId;
    const url = `${SERVER_URL}/api/post/get-post/${postId}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      setPostInfo(response.data.post);
      setCommentCount(response.data.post.comment.length);
      setLikeCount(response.data.post.likes.length);
      setLiked(response.data.post.likes.includes(userData._id));
    } catch (error) {
      console.log(error);
      if (error.status == 400 || error.status == 500) {
        console.log(error);
      }
      if (error.status == 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (showPostDialog.postId) {
      getPostInfo();
    }
  }, []);

  const onClickHandle = () => {
    setShowPostDialog({
      show: false,
      postId: "",
    });
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  //---------------------- Function to toggle play/pause--------------------//

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  //  ----------------get post comment------------------------//

  const getComments = async () => {
    const postId = showPostDialog.postData._id;
    const url = `${SERVER_URL}/api/post/get-comment/${postId}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      setComments(response.data.comment);
    } catch (error) {
      console.log(error);
      if (error.status == 400 || error.status == 500) {
      }
      if (error.status == 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  // ---------onComment change---------//

  const [text, setText] = useState("");

  const onCommentChangeHandle = (event) => {
    const value = event.target.value;
    if (value.trimStart()) {
      setText(value);
    } else {
      setText("");
    }
  };

  //----------------------add comment-------------------//

  const addComment = async () => {
    const postId = showPostDialog.postId;
    const url = `${SERVER_URL}/api/post/add-comment/${postId}`;
    try {
      const response = await axios.post(
        url,
        { text },
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: "bottom-right",
        });
        setCommentCount(commentCount + 1);
        getComments();
      }
    } catch (error) {
      if (error.status == 400 || error.status == 500) {
        toast.error(response.data.message, {
          position: "bottom-right",
        });
      }
    }
    setText("");
  };

  //----------------Like and dislike -------------------------//

  const likeOrDisLikeHandler = async () => {
    const postId = showPostDialog.postData._id;
    const action = liked ? "disLike" : "Like";

    //------ disLike the post---------

    if (action == "disLike") {
      const url = `${SERVER_URL}/api/post/dislike/${postId}`;
      try {
        const response = await axios.post(url, {}, { withCredentials: true });
        if (response.status == 200) {
          toast(response.data.message, {
            position: "bottom-right",
          });

          setLikeCount(likeCount - 1);
          setLiked(false);
        }
      } catch (error) {
        if (error.status == 400 || error.status == 500) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      const url = `${SERVER_URL}/api/post/like/${postId}`;
      try {
        const response = await axios.post(url, {}, { withCredentials: true });
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "bottom-right",
          });
          setLiked(true);
          setLikeCount(likeCount + 1);
        }
      } catch (error) {
        if (error.status == 400 || error.status == 500) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  // ------------------Bookmark post----------------------//

  const [isBookMarked, setIsBookMarked] = useState(
    userData.bookmarks.includes(showPostDialog.postId)
  );

  const bookmark = async () => {
    const postId = showPostDialog.postId;
    const url = `${SERVER_URL}/api/post/bookmark/${postId}`;
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: "bottom-right",
        });
        setIsBookMarked(!isBookMarked);
      }
    } catch (error) {
      if (error.status == 400 || error.status == 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div
      onClick={onClickHandle}
      className="w-full h-screen bg-black bg-opacity-50 fixed  left-0 top-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="p-2 flex flex-col gap-2  w-[40%] bg-white h-full overflow-y-scroll no-scrollbar  mobile:w-full tablet:w-[70%]"
      >
        {/*---------section top---------- */}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full"
              src={postInfo ? postInfo.author.profilePhoto : ""}
              alt=""
            />
            <p className="text-sm font-medium">
              {postInfo ? postInfo.author.userName : ""}
            </p>
          </div>
          <div
            onClick={onClickHandle}
            className="cursor-pointer bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full "
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </div>
        </div>

        {/* -----------section image  and videos------ */}

        <div className="relative">
          {postInfo &&
            (postInfo.fileType === "image" ? (
              <img
                src={postInfo.image}
                alt="Post content"
                className="media w-full"
              />
            ) : (
              <div>
                {/* Video Element */}
                <video
                  ref={videoRef}
                  src={postInfo.image}
                  className="media cursor-pointer w-full"
                  muted={isMuted}
                  onClick={togglePlayPause}
                />

                {/* Controls */}

                <div className="rounded-full bg-opacity-30 w-8 h-8 flex justify-center items-center bg-black  absolute bottom-1 left-2 text-white text-lg">
                  <i
                    onClick={togglePlayPause}
                    className={` fa-solid ${
                      isPlaying ? "fa-pause" : "fa-play"
                    }  `}
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
            ))}
        </div>

        {/*------------section for like and comment display------------- */}

        <div className="flex justify-between text-sm text-gray-600">
          <p>{likeCount} Likes</p>
          <p>{commentCount} Comments</p>
        </div>
        <hr />

        {/*---------section bottom for like comment and-------------- */}

        <div className="flex justify-between text-xl">
          <div
            onClick={likeOrDisLikeHandler}
            className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200"
          >
            <i
              className={` ${
                liked ? "fa-solid text-red-500" : "fa-regular"
              } fa-heart `}
            ></i>
            <p className="text-sm font-medium  mobile:hidden">Like</p>
          </div>
          <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
            <i className="fa-regular fa-comment"></i>
            <p className="text-sm font-medium mobile:hidden">Comment</p>
          </div>
          <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
            <i className="fa-regular fa-share-from-square"></i>
            <p className="text-sm font-medium mobile:hidden">Share</p>
          </div>
          <div
            onClick={bookmark}
            className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200"
          >
            <i
              className={`${
                isBookMarked ? "fa-solid" : "fa-regular"
              } fa-regular fa-bookmark`}
            ></i>
            <p className="text-sm font-medium mobile:hidden">Bookmark</p>
          </div>
        </div>
        <hr />
        {/* ------------------------caption------------------- */}
        <div className="text-md">{postInfo ? postInfo.caption : ""}</div>
        {/* -----------------Add comment---------------------- */}

        <div className="flex gap-2 items-center mt-2 ">
          <img className="w-6 h-6 rounded-full" src={profile} alt="" />
          <div className="flex items-center border border-black w-full  rounded-full text-sm">
            <input
              onChange={onCommentChangeHandle}
              className="rounded-full outline-none w-full px-2 py-1"
              type="text"
              value={text}
              placeholder="Add comment"
            />
            {text ? (
              <p
                onClick={addComment}
                className="cursor-pointer bg-gray-200 py-1 px-2 rounded-r-full text-gray-800"
              >
                Comment
              </p>
            ) : (
              <p className="bg-gray-200 py-1 px-2 rounded-r-full text-gray-400">
                Comment
              </p>
            )}
          </div>
        </div>
        <hr />
        {/* --------------all comments------------------ */}

        {
          comments.length<0 ?<Loader3></Loader3>:        <div className="flex flex-col gap-4 mt-4">
          {comments.map((comment, index) => {
            return (
              <div key={index} className="flex gap-4 items-start">
                <img
                  className="w-6 h-6 rounded-full"
                  src={comment.author.profilePhoto}
                  alt=""
                />
                <p className="text-md text-gray-600">
                  <span className="cursor-pointer font-semibold text-black">
                    {" "}
                    {comment.author.userName}{" "}
                  </span>
                  {comment.text}
                </p>
              </div>
            );
          })}
        </div>
        }

      </div>
    </div>
  );
};

export default PostDialog;
