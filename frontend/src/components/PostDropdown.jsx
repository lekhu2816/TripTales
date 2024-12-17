import React, { useContext } from "react";
import { AppContext } from "../context/Context";
const PostDropdown = () => {
  const {postDropdown ,setPostDropdown ,userData} = useContext(AppContext);

  const onClickHandle = () => {
    setPostDropdown({
      show: false,
      postId: "",
      userId: "",
    });
  };
console.log(postDropdown)
  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the parent
  };
  return (
    <div
      onClick={onClickHandle}
      className="w-full h-screen fixed bg-black bg-opacity-[50%]  left-0 top-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="bg-white shadow text-center rounded-md w-[30%]"
      >
        <div className="cursor-pointer p-2 border-b-[1px] text-red-500">
          Follow
        </div>
        <div className="cursor-pointer p-2 border-b-[1px]">
          Add to favourite
        </div>
        {
          postDropdown.userId==userData._id?<div className="cursor-pointer p-2 border-b-[1px]">Delete</div>:<></>
        }
        <div  onClick={onClickHandle} className="cursor-pointer p-2 ">Cancel</div>
      </div>
    </div>
  );
};

export default PostDropdown;
