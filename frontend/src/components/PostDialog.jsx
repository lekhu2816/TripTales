import React, { useContext,useState,useRef } from "react";
import { AppContext } from "../context/Context";
import profile from "../assets/profile.jpg";
import Img3 from "../assets/Img3.jpg";

const PostDialog = () => {
  const { showPostDialog, setShowPostDialog } = useContext(AppContext);
  const onClickHandle = () => {
    setShowPostDialog({
      show: false,
      postId: "",
    });
  };
  
  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the parent
  };

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
            <img className="w-8 h-8 rounded-full" src={showPostDialog.postData.author.profilePhoto} alt="" />
            <p className="text-sm font-medium">{showPostDialog.postData.author.userName}</p>
          </div>
          <div onClick={onClickHandle}  className="cursor-pointer bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full ">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </div>
        </div>

        {/* -----------section image  and videos------ */}

        <div className="relative">
        {showPostDialog.postData.fileType === "image" ? (
          <img src={showPostDialog.postData.image} alt="Post content" className="media" />
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
          <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
            <i className="fa-regular fa-heart"></i>
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
          <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
            <i className="fa-regular fa-bookmark"></i>
            <p className="text-sm font-medium mobile:hidden">Bookmark</p>
          </div>
        </div>
        <hr />
        {/* ------------------------caption------------------- */}
        <div className="text-sm">
            {showPostDialog.postData.caption}
        </div>
        {/* -----------------Add comment---------------------- */}

        <div className="flex gap-2 items-center">
          <img className="w-6 h-6 rounded-full" src={profile} alt="" />
          <div className="flex items-center border border-black w-full  rounded-full text-sm">
            <input
              className="rounded-full outline-none w-full px-2 py-1"
              type="text"
              placeholder="Add comment"
            />
            <p className="bg-gray-200 py-1 px-2 rounded-r-full text-gray-400">
              Comment
            </p>
          </div>
        </div>
        <hr />
        {/* --------------all comments------------------ */}
        <div className="flex flex-col gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((comment,index) => {
            return (
              <div key={index}  className="flex gap-2 items-start">
                <img className="w-5 h-5 rounded-full" src={profile} alt="" />
                <p className="text-sm text-gray-600">
                  <span className="cursor-pointer font-semibold text-black">
                    {" "}
                    Lekhumsd_2806{" "}
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, sit!
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
