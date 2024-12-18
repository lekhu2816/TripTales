import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/Context";
import profile from "../assets/profile.jpg";
import axios from "axios";
import { toast } from "react-toastify";


const PostDialog = () => {
  const {
    SERVER_URL,
    showPostDialog,
    setShowPostDialog,
    logout,
    post,
    setPost,
    userData,
  } = useContext(AppContext);

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

  // Function to toggle mute/unmute

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  //  ----------------get post comment------------------------//

  const [comments, setComments] = useState([]);

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
    const postId = showPostDialog.postData._id;
    const url = `${SERVER_URL}/api/post/add-comment/${postId}`;
    try {
      const response = await axios.post(
        url,
        { text },
        { withCredentials: true }
      );
      if (response.status == 200) {
        const updatedData = post.map((p) => {
          if (p._id === postId) {
            return {
              ...p,
              comment: [...p.comment, userData._id],
            };
          }
          return p;
        });
        setPost(updatedData);

        toast.success(response.data.message, {
          position: "bottom-right",
        });
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

  const [liked, setLiked] = useState(
    showPostDialog.postData.likes.includes(userData._id) || false
  );

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

          const updatedData = post.map((p) => {
            if (p._id == postId) {
              {
                return {
                  ...p,
                  likes: p.likes.filter((id) => id != userData._id),
                };
              }
            }
            return p;
          });

          setPost(updatedData);
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

          const updatedData = post.map((p) => {
            if (p._id == postId) {
              p.likes.push(userData._id);
            }
            return p;
          });
          setPost(updatedData);
          setLiked(true);
        }
      } catch (error) {
        if (error.status == 400 || error.status == 500) {
          toast.error(error.response.data.message);
        }
      }
    }
  };


  // ------------------Bookmark post----------------------//

  const [isBookMarked,setIsBookMarked]=useState(userData.bookmarks.includes(showPostDialog.postData._id));

  const bookmark=async()=>{
    const postId = showPostDialog.postData._id;
    const url = `${SERVER_URL}/api/post/bookmark/${postId}`;
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: "bottom-right",
        })
        setIsBookMarked(!isBookMarked)
      }
    } catch (error) {
      if (error.status == 400 || error.status == 500) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div
      onClick={onClickHandle}
      className="w-full h-screen bg-black bg-opacity-50 fixed  left-0 top-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="p-2 flex flex-col gap-2  max-w-[40%] bg-white h-full overflow-y-scroll scrollbar-hidden mobile:max-w-full"
      >
        {/*---------section top---------- */}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full"
              src={showPostDialog.postData.author.profilePhoto}
              alt=""
            />
            <p className="text-sm font-medium">
              {showPostDialog.postData.author.userName}
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
          {showPostDialog.postData.fileType === "image" ? (
            <img
              src={showPostDialog.postData.image}
              alt="Post content"
              className="media"
            />
          ) : (
            <div>
              {/* Video Element */}
              <video
                ref={videoRef}
                src={showPostDialog.postData.image}
                className="media cursor-pointer"
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
          )}
        </div>

        {/*------------section for like and comment display------------- */}

        <div className="flex justify-between text-sm text-gray-600">
          <p>{showPostDialog.postData.likes.length} Likes</p>
          <p>{showPostDialog.postData.comment.length} Comments</p>
        </div>
        <hr />

        {/*---------section bottom for like comment and-------------- */}

        <div className="flex justify-between text-xl">
          <div onClick={likeOrDisLikeHandler} className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
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
          <div onClick={bookmark} className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
            <i className={`${isBookMarked?"fa-solid":"fa-regular"} fa-regular fa-bookmark`}></i>
            <p className="text-sm font-medium mobile:hidden">Bookmark</p>
          </div>
        </div>
        <hr />
        {/* ------------------------caption------------------- */}
        <div className="text-sm">{showPostDialog.postData.caption}</div>
        {/* -----------------Add comment---------------------- */}

        <div className="flex gap-2 items-center">
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
        <div className="flex flex-col gap-4 mt-4">
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
      </div>
    </div>
  );
};

export default PostDialog;
