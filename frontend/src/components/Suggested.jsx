import React, { useContext } from "react";
import { AppContext } from "../context/Context";
const Suggested = () => {
  const {suggestedUser}=useContext(AppContext)
  return (
    <div className="flex flex-col gap-4 p-2 shadow rounded-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-gray-500">Suggested for you</h1>
        <h1 className="font-semibold">see all</h1>

      </div>
    <div className="flex flex-col gap-2">
    {
        suggestedUser.map((user,index)=>(
            <div key={index} className="flex justify-between">
            <div className="flex gap-3 items-center">
              <img className="w-8 h-8 rounded-full" src={user.profilePhoto} alt="" />
              <p className="font-semibold text-md">{user.userName}</p>
            </div>
            <p className="text-blue-700 font-medium cursor-pointer text-sm">follow</p>
          </div>
        ))
     }
    </div>
    </div>
  );
};

export default Suggested;
