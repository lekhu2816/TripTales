import React, { useContext } from "react";
import profile from "../assets/profile.jpg";
import Img3 from "../assets/Img3.jpg";
import { AppContext } from "../context/Context";
const Post = () => {
const { setShowPostDialog}=useContext(AppContext);
const onClickHandle=(postId)=>{
    setShowPostDialog({
    show:true,
    postId:postId
 })
}

  return (
    <div className="p-2  flex flex-col gap-2 mobile:p-0">
      {/*---------section top---------- */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img className="w-8 h-8 rounded-full" src={profile} alt="" />
          <p className="text-sm font-medium">lekhumsd_2806</p>
        </div>
        <div className="cursor-pointer">
          <i className="material-icons">more_horiz</i>
        </div>
      </div>

      {/* -----------section image------- */}

      <div>
        <img src={Img3} alt="" />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <p>1234 Likes</p>
        <p>16 Comments</p>
      </div>
      <hr />

      {/*---------section bottom for like comment and-------------- */}
      
      <div className="flex justify-between mobile:text-xl">
        <div className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
          <i className="fa-regular fa-heart"></i>
          <p className="text-sm font-medium mobile:hidden ">Like</p>
        </div>
        <div onClick={()=>onClickHandle(123)}  className="flex items-center justify-center gap-1 p-1 w-[25%] cursor-pointer rounded-lg hover:bg-gray-200">
          <i  className="fa-regular fa-comment"></i>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis rerum sed voluptatum facere exercitationem molestias quia, quos impedit, dicta earum aliquam voluptates? Excepturi dicta officia deserunt? Similique voluptas veniam nemo!
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
    </div>
  );
};

export default Post;
