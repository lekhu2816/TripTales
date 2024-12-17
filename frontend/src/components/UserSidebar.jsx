import React, { useContext } from "react";
import coverPic from "../assets/coverPic.jpeg";
import profile from "../assets/profile.jpg";
import {AppContext} from '../context/Context'
const UserSidebar = () => {
  const {userData}=useContext(AppContext);
  return (
    <div className="pb-2 shadow rounded-md">
      <div className="relative">
        <img src={userData.coverPhoto} alt="" />
        <div
          className="w-24 h-24 rounded-full p-1 bg-white absolute -bottom-12
        left-[35%]"
        >
          <img className="rounded-full" src={userData.profilePhoto} alt="" />
        </div>
      </div>
      <div className="text-center mt-12">
      <p className="text-lg font-semibold">{userData.name}</p>
        <p className="text-sm text-gray-500">{userData.bio}</p>
      </div>
    </div>
  );
};

export default UserSidebar;
