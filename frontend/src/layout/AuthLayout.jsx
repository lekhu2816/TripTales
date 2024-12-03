import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Img1 from "../assets/Img1.JPEG";
import Img2 from "../assets/Img2.JPG";
import Img3 from "../assets/Img3.JPG";
import Img4 from "../assets/Img4.JPG";
import { Link } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className=" mx-10 tablet:mx-5 mobile:mx-2">
      <div className="w-16">
        <Link to={"/"}>
          <img src={Logo} alt="" />
        </Link>
      </div>
      <hr className="mt-1" />
      <div className="h-[89vh] flex tablet:flex-col tablet:h-auto mobile:flex-col mobile:h-auto">

        {/*------------------------ Left-section-------------------------*/}


        <div className="h-full w-1/2  flex flex-col justify-center items-center gap-4 tablet:w-full tablet:mt-2  mobile:w-full mobile:mt-2">
          <div className="w-[75%] flex flex-wrap justify-center items-center gap-2 ">
            <img className="w-[40%] rounded-md" src={Img1} alt="" />
            <img className="w-[40%] rounded-md" src={Img2} alt="" />
            <img className="w-[40%] rounded-md" src={Img3} alt="" />
            <img className="w-[40%] rounded-md" src={Img4} alt="" />
          </div>
          <div className="text-center">
            <h1 className="text-primary text-2xl font-semibold">TRIPTALES</h1>
            <p className="text-secondary">Where Every Adventure Speak</p>
          </div>
        </div>

        {/*------------------------ Right-section-------------------------*/}

        <div className="w-1/2 tablet:w-full mobile:w-full">
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
