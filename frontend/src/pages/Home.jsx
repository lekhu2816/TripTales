import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import Post from "../components/Post";
import UserSidebar from "../components/UserSidebar";
import Suggested from "../components/Suggested";
import axios from "axios";

const Home = () => {
  const { setShowDropdown, post, setPost, SERVER_URL } = useContext(AppContext);
  const [page,setPage]=useState(0)
  // ---------------------------Getting posts---------------------------------//

  const getPosts = async (pageNo) => {
    const url = `${SERVER_URL}/api/post/get-all?page=${page}&limit=5`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response.status == 200) {
        setPost((prev) => [...prev, ...response.data.posts])
        
        
      }
    } catch (error) {
      if (error.status == 401) {
        logout();
      }
    }
  };

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev)=>(prev+1))
    }
  };

  useEffect(() => {
    setShowDropdown(false);
  }, []);


  useEffect(()=>{
    if(post.length==0){
      getPosts(0);
    }
  },[])

  useEffect(() => {
    if (page > 0) {
      getPosts(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <Post key={index} postData={data} />
            <div className="h-[1px] my-4 bg-black"></div>
          </>
        ))}
      </div>

      <div className="py-2 w-[30%] mobile:hidden">
        <Suggested></Suggested>
      </div>
    </div>
  );
};

export default Home;
