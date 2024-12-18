import React, { useContext, useEffect, useState } from "react";
import img3 from "../assets/img3.jpg";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import axios from "axios";
const Posts = () => {
  const { SERVER_URL } = useContext(AppContext);
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const getUserPosts = async () => {
    const url = `${SERVER_URL}/api/post/getuserPost/${id}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      setPost(response.data.posts);
    } catch (error) {
      if (error.status == 400 || error.status == 500) {
        toast.error(error.response.data.message);
      }
      if (error.status == 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [id]);

  return (
    <div className=" my-2">
      <div className="flex flex-wrap gap-2 justify-center">
        {post.map((post, index) => {
          return (
            <div
              key={index}
              className=" relative group w-[30%]  tablet:w-[49%]"
            >
              <div className="absolute inset-0 flex  justify-center items-center opacity-0 bg-opacity-50 bg-black group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white text-lg">
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-comment"></i>
                    <p>{post.comment.length}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-heart"></i>
                    <p>{post.likes.length}</p>
                  </div>
                </div>
              </div>

              {post.fileType == "image" ? (
                <img src={post.image} alt="" />
              ) : (
                <video
                  className="w-full h-[60%] object-cover"
                  src={post.image}
                ></video>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
