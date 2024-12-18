import React, { useContext, useEffect, useState } from "react";
import img3 from "../assets/img3.jpg";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import axios from "axios";
const Posts = () => {
  const {SERVER_URL}=useContext(AppContext);
  const [post, setPost] = useState([]);
  const {id}=useParams()

 const getUserPosts=async()=>{
  const url=`${SERVER_URL}/api/post/getuserPost/${id}`
  try {
    const response=await axios.get(url,{withCredentials:true})
    setPost(response.data.posts)
  } catch (error) {
     if(error.status==400||error.status==500){
          toast.error(error.response.data.message)
        }
        if(error.status==401){
          logout()
        }
  }
 }

  useEffect(()=>{
      getUserPosts()
  },[id])
 
  return (
    <div className=" my-2">
      <div className="flex flex-wrap gap-2 justify-center">
      {post.map((post, index) => {
        return (
          <div key={index} className="w-[30%]  tablet:w-[49%]">
            {
              post.fileType=="image"?<img src={post.image} alt="" />:
              <video className="w-full h-[60%] object-cover" src={post.image}></video>
            }
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Posts;
