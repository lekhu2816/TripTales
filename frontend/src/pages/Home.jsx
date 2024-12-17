import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import Suggested from "../components/Suggested";
const Home = () => {
  const { setShowDropdown ,post} = useContext(AppContext);
  useEffect(() => {
    setShowDropdown(false);
  }, []);
  

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        setShowDropdown(false);
      }}
      className=" flex gap-2 justify-between  relative "
    >
      <div className="py-2 w-[30%] mobile:hidden">
        <UserSidebar></UserSidebar>
      </div>

      <div className="w-[40%] mobile:w-full">
        {post.map((data,index) => (
          <>
            <Post key={index} postData={data}  />
            <div className="h-[1px] my-4 bg-black"></div>
          </>
        ))}
      </div>

      <div className="w-[30%] mobile:hidden">
        <Suggested></Suggested>
      </div>
    </div>
  );
};

export default Home;
