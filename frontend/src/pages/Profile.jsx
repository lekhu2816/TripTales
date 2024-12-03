import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import coverPic from "../assets/coverPic.jpeg";
import profile from "../assets/profile.jpg";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
const userProfile={
  username:"Lekhansh Sachan",
  nickname:"lekhu@2806_",
  bio:["Traveller","Next stop at the top"],
  posts:234,
  followers:2456,
  folllowing:45
}
const Profile = () => {
  const {pathname}=useLocation()
  const navigate=useNavigate();
  const { setShowDropdown } = useContext(AppContext);
  useEffect(() => {
    setShowDropdown(false);
  }, []);
  return (
    <div onClick={() => setShowDropdown(false)} className="mb-16">
      <div className="w-full h-[60vh] rounded-lg tablet:h-[40vh] mobile:h-[30vh]">
        <img className="h-full w-full rounded-lg" src={coverPic} alt="" />
      </div>

      <div className=" relative">
        <div className="bg-white p-1 w-44 h-44 rounded-full absolute -top-10 left-5 mobile:w-32 mobile:h-32">
          <img className="rounded-full" src={profile} alt="" />
        </div>

        {/* ----------------------------User-Description---------------------------- */}

        <div className="ml-52 p-4 flex justify-between tablet:flex-col tablet:gap-2 mobile:gap-2 mobile:flex-col mobile:ml-0 ">
          <div className=" flex flex-col gap-2  mobile:mt-20">
            <div>
              <p className="text-3xl font-bold">{userProfile.nickname}</p>
              <p className="text-md font-semibold text-gray-600">
               {userProfile.username}
              </p>
            </div>
            <div>
              <p className="text-md font-bold">Bio</p>
              {
                userProfile.bio.map((item,index)=>{
                  return <p key={index} className="text-sm">{item}</p>
                })
              }
              
              
            </div>
          </div>
          <div className=" flex flex-col gap-4 tablet:gap-2 mobile:gap-2">
            <div className="flex gap-4">
              <p>
                {" "}
                <span className="font-semibold">{userProfile.posts}</span> posts
              </p>
              <p>
                {" "}
                <span className="font-semibold">{userProfile.followers}</span> followers
              </p>
              <p>
                {" "}
                <span className="font-semibold">{userProfile.folllowing}</span> following
              </p>
            </div>
            <div>
              <button onClick={()=>navigate('/edit')} className="text-sm font-semibold rounded-lg px-4 py-2 bg-gray-300">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-1" />

      {/* ------------------section posts--------------------------- */}

      <div className=" flex gap-10 justify-center">
        <div onClick={()=>navigate('/profile')} className={`p-1 flex items-center justify-center gap-2  cursor-pointer ${pathname=="/profile"?"text-black":"text-gray-500"}`}>
          <p>Posts</p>
          <i className=" material-icons">dataset</i>
        </div>
        <div onClick={()=>navigate('/profile/gallery')} className={`p-1 flex items-center justify-center gap-2  cursor-pointer ${pathname=="/profile/gallery"?"text-black":"text-gray-500"}`}>
          <p>Gallery</p>
          <i className="material-icons">collections_bookmark</i>
        </div>
        <div onClick={()=>navigate('/profile/saved')} className={`p-1 flex items-center justify-center gap-2  cursor-pointer ${pathname=="/profile/saved"?"text-black":"text-gray-500"}`}>
          <p>Saved</p>
          <i className="material-icons">bookmark</i>
        </div>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Profile;
