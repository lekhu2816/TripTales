import React from "react";
import profile from "../assets/profile.jpg";
const Suggested = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-gray-500">Suggested for you</h1>
        <h1 className="font-semibold">see all</h1>

      </div>
    <div className="flex flex-col gap-2">
    {
        [1,2,3,4,5].map(()=>(
            <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <img className="w-8 h-8 rounded-full" src={profile} alt="" />
              <p className="font-semibold text-md">lekhumsd_2806</p>
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
