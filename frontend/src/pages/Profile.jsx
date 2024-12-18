import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {SERVER_URL,setShowDropdown, userData,logout} = useContext(AppContext);
  const [userProfile,setUserProfile]=useState({
    userName: "",
    name: "",
    bio: "",
    profilePhoto:"",
    coverPhoto:"",
    posts: [],
    followers: [],
    following: [],
    
    
  })


  const getUser=async()=>{
    const url=`${SERVER_URL}/api/user/get/${id}`
   try {
    const response=await axios.get(url,{withCredentials:true})
    setUserProfile(response.data.user)
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
     getUser()
  },[id])

  useEffect(() => {
    setShowDropdown(false);
  }, []);

  return (
    <div onClick={() => setShowDropdown(false)} className="mb-16">
      <div className="w-full h-[60vh] rounded-lg tablet:h-[40vh] mobile:h-[30vh]">
        <img className="h-full object-cover w-full rounded-lg" src={userProfile.coverPhoto} alt="" />
      </div>

      <div className=" relative">
        <div className="bg-white p-1 w-44 h-44 rounded-full absolute -top-10 left-5 mobile:w-32 mobile:h-32">
          <img className="rounded-full" src={userProfile.profilePhoto} alt="" />
        </div>

        {/* ----------------------------User-Description---------------------------- */}

        <div className="ml-52 p-4 flex justify-between tablet:flex-col tablet:gap-2 mobile:gap-2 mobile:flex-col mobile:ml-0 ">
          <div className=" flex flex-col gap-2  mobile:mt-20">
            <div>
              <p className="text-3xl font-bold">{userProfile.userName}</p>
              <p className="text-md font-semibold text-gray-600">
                {userProfile.name}
              </p>
            </div>
            <div>
              <p className="text-md font-bold">Bio</p>
              {/* {userProfile.bio.map((item, index) => {
                return (
                  <p key={index} className="text-sm">
                    {item}
                  </p>
                );
              })} */}
            </div>
          </div>
          <div className=" flex flex-col gap-4 tablet:gap-2 mobile:gap-2">
            <div className="flex gap-4">
              <p>
                {" "}
                <span className="font-semibold">{userProfile.posts.length}</span> posts
              </p>
              <p>
                {" "}
                <span className="font-semibold">
                  {userProfile.followers.length}
                </span>{" "}
                followers
              </p>
              <p>
                {" "}
                <span className="font-semibold">
                  {userProfile.following.length}
                </span>{" "}
                following
              </p>
            </div>
            <div>
              {id == userData._id ? (
                <button
                  onClick={() => navigate("/edit")}
                  className="text-sm font-semibold rounded-lg px-4 py-2 bg-gray-300"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => navigate("/edit")}
                  className="text-sm font-semibold rounded-lg px-4 py-2 bg-gray-300"
                >
                  follow
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-1" />

      {/* ------------------section posts--------------------------- */}

      <div className=" flex gap-10 justify-center">
        <div
          onClick={() => navigate(`/profile/${id}`)}
          className={`p-1 flex items-center justify-center gap-2  cursor-pointer ${
            pathname == `/profile/${id}` ? "text-black" : "text-gray-500"
          }`}
        >
          <p>Posts</p>
          <i className=" material-icons">dataset</i>
        </div>
        <div
          onClick={() => navigate(`/profile/${id}/gallery`)}
          className={`p-1 flex items-center justify-center gap-2  cursor-pointer ${
            pathname == `/profile/${id}/gallery`
              ? "text-black"
              : "text-gray-500"
          }`}
        >
          <p>Gallery</p>
          <i className="material-icons">collections_bookmark</i>
        </div>
        <div
          onClick={() => navigate(`/profile/${id}/saved`)}
          className={`p-1 flex items-center justify-center gap-2  cursor-pointer ${
            pathname == `/profile/${id}/saved` ? "text-black" : "text-gray-500"
          }`}
        >
          <p>Saved</p>
          <i className="material-icons">bookmark</i>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
