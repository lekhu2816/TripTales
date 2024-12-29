import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import img from "../assets/img3.jpg";
const list = [
  "Mountains",
  "Valley",
  "Desert",
  "Trekking",
  "Camping",
  "Monuments",
  "Waterfalls",
  "Valleys",
  "Zoos",
  "Festivals",
];
const Explore = () => {
  const { setShowDropdown } = useContext(AppContext);
  const [post,setPost]=useState([1,2,3,4,5,6,7,8,9,0,1,2,3,2,4,7,8,9,0])

  useEffect(() => {
    setShowDropdown(false);
  }, []);
  return (
    <div onClick={() => setShowDropdown(false)} >
      <div className="flex gap-4 justify-between  overflow-x-scroll no-scrollbar">
        {list.map((item, index) => {
          return (
            <div className="bg-secondary py-1 px-2 rounded-md text-white text-sm">
              {item}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-4 ">
       {
        post.map(()=>{
          return  (<img className="w-[24%] tablet:w-[48%]" src={img} alt="" />)
        })
       }
      </div>
    </div>
  );
};

export default Explore;
