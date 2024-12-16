import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setShowDropdown } = useContext(AppContext);
  useEffect(() => {
    setShowDropdown(false);
  }, []);
  const [postData, setPostData] = useState([1, 2, 3, 4, 5, 6]);
  const navigate = useNavigate();


  return (
    <div
      onClick={() => setShowDropdown(false)}
      className=" flex gap-2 justify-between  relative "
    >
      <div className="border border-red-600 p-2 w-[30%] mobile:hidden"></div>

      <div className="w-[40%] mobile:w-full">
        {postData.map(() => (
          <>
            <Post />
            <div className="h-[1px] my-4 bg-black"></div>
          </>
        ))}
      </div>

      <div className="border border-red-600 p-2 w-[30%] mobile:hidden"></div>
    </div>
  );
};

export default Home;
