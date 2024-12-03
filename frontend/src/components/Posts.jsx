import React, { useState } from "react";
import img3 from "../assets/img3.jpg";
const Posts = () => {
  const [post, setPost] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  return (
    <div className=" my-2">
      <div className="flex flex-wrap gap-2 justify-center">
      {post.map((img, index) => {
        return (
          <div key={index} className="w-[30%] tablet:w-[49%]">
            <img src={img3} alt="" />
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Posts;
