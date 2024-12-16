import React from "react";
import coverPic from "../assets/coverPic.jpeg";
import profile from "../assets/profile.jpg";
const UserSidebar = () => {
  return (
    <div className="pb-2  shadow rounded-md">
      <div className="relative">
        <img src={coverPic} alt="" />
        <div
          className="w-24 h-24 rounded-full p-1 bg-white absolute -bottom-12
        left-[35%]"
        >
          <img className="rounded-full" src={profile} alt="" />
        </div>
      </div>
      <div className="text-center mt-12">
        <p className="text-lg font-semibold">Lekhansh Sachan</p>
        <p className="text-sm text-gray-500">Next Stop at top</p>
      </div>
    </div>
  );
};

export default UserSidebar;
