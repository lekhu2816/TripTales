import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
const PostDropdown = () => {
  const {
    logout,
    SERVER_URL,
    postDropdown,
    setPostDropdown,
    userData,
    post,
    setPost,
  } = useContext(AppContext);

  const onClickHandle = () => {
    setPostDropdown({
      show: false,
      postId: "",
      userId: "",
    });
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); 
  };

  // ------------------------------Delete post----------------------------//

  const deletePost = async () => {
    const postId = postDropdown.postId;
    const url = `${SERVER_URL}/api/post/delete-post/${postId}`;
    if (confirm("Want to delete this Post")) {
      try {
        const response = await axios.delete(url, { withCredentials: true });
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "bottom-right",
          });
          const updatedPost = post.filter(
            (postItem) => postItem?._id != postId
          );
          setPost(updatedPost);
          onClickHandle();
        }
      } catch (error) {
        if (error.status == 400 || error.status == 500) {
          toast.error(response.data.message, {
            position: "bottom-right",
          });
        }
        if (error.status == 401) {
          logout();
        }
      }
    }
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
        {postDropdown.userId == userData._id ? (
          <div
            onClick={deletePost}
            className="cursor-pointer p-2 border-b-[1px]"
          >
            Delete
          </div>
        ) : (
          <></>
        )}
        <div onClick={onClickHandle} className="cursor-pointer p-2 ">
          Cancel
        </div>
      </div>
    </div>
  );
};

export default PostDropdown;
