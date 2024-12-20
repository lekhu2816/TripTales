import React, { useContext } from "react";
import Logo from "../assets/Logo.png";
import profile from "../assets/profile.jpg";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/Context";

const Navbar = () => {
   const {showDropdown,setShowDropdown,userData}=useContext(AppContext);
  return (
    <>
      <nav className="z-10 w-full bg-white fixed top-0 h-14 shadow-md px-10 flex justify-between items-center tablet:hidden mobile:hidden">
        {/* ----------------------------------section-left-------------------------- */}

        <div className="w-[30%]  flex items-center justify-start gap-4 ">
          <Link to={'/'} className="w-16">
            <img src={Logo} alt="" />
          </Link>

          <div className=" rounded-full  flex items-center">
            <input
              className="rounded-s-full py-1 pl-4 bg-gray-100 outline-none"
              type="text"
              placeholder="Search "
            />
            <i className="px-2 py-1 rounded-e-full material-icons bg-gray-300">
              search
            </i>
          </div>
        </div>
        {/* -----------------------------Section-middle------------------------ */}

        <div className="w-[40%] h-full  flex ">
          <NavLink
            to={"/"}
            className=" border-b-4 border-transparent text-gray-400 w-[25%] flex justify-center items-center"
          >
            <i className=" text-4xl material-icons "> home </i>
          </NavLink>
          <div className="border-b-4 border-transparent text-gray-400  w-[25%] flex justify-center items-center">
            <i className=" text-4xl material-icons "> movie </i>
          </div>
          <NavLink
            to={"explore"}
            className="border-b-4 border-transparent text-gray-400  w-[25%] flex justify-center items-center"
          >
            <i className=" text-4xl material-icons "> explore </i>
          </NavLink>
          <NavLink
            to={"notifications"}
            className="relative border-b-4 border-transparent text-gray-400 w-[25%] flex justify-center items-center"
          >
            <i className="  text-4xl material-icons "> notifications_active </i>
            <div className="text-sm font-semibold text-red-500 absolute top-1 right-6">
              45
            </div>
          </NavLink>
        </div>

        {/*------------------------- section-right------------------------- */}

        <div className="w-[30%] h-full flex justify-end items-center gap-4">
          <Link to={'/upload'}>
            <i className="p-2 text-4xl  material-icons ">add_circle </i>
          </Link>
          <Link to={'/chat'}>
            <i className="p-2 text-4xl material-icons ">chat</i>
          </Link>

          <div onClick={()=>setShowDropdown(true)}>
            <img className="w-8 h-8 rounded-full" src={userData.profilePhoto} alt="" />
          </div>
        </div>
        {
          showDropdown?<div className="absolute right-0 top-14">
          <Sidebar/>
        </div>:<></>
        }
      </nav>

      {/* -----------------Mobile-view & Tablet-view------------------------- */}

      <nav className=" z-10 w-full fixed top-0 bg-white hidden h-14 shadow-md tablet:flex   mobile:flex justify-between items-center tablet:px-5 mobile:px-2">
        <Link to={'/'} className="w-14">
          <img src={Logo} alt="" />
        </Link>

        <div className=" w-[70%] rounded-full  flex items-center">
          <input
            className="w-full rounded-s-full py-1 pl-4 bg-gray-100 outline-none"
            type="text"
            placeholder="Search "
          />
          <i className="px-2 py-1 rounded-e-full material-icons bg-gray-300">
            search
          </i>
        </div>

        <div onClick={()=>setShowDropdown(true)}>
          <img className="w-8 h-8 rounded-full" src={profile} alt="" />
        </div>
        {
          showDropdown?<div className="absolute right-0 top-14">
          <Sidebar/>
        </div>:<></>
        }
      </nav>

      {/* -----------------------section-bottom------------------------- */}
       
      <div className="z-10 hidden w-full px-5 pt-2 bg-gray-100 fixed  bottom-0 mobile:flex tablet:flex  justify-between ">
        <NavLink
          to={"/"}
          className=" border-b-4 border-transparent flex justify-center items-center"
        >
          <i className=" text-4xl material-icons mobile:text-3xl "> home </i>
        </NavLink>
        <div className="border-b-4 border-transparent   flex justify-center items-center">
          <i className=" text-4xl material-icons  mobile:text-3xl"> movie </i>
        </div>
        <NavLink
          to={"explore"}
          className="border-b-4 border-transparent  flex justify-center items-center"
        >
          <i className=" text-4xl material-icons  mobile:text-3xl "> explore </i>
        </NavLink>
        <NavLink
          to={"notifications"}
          className="relative border-b-4 border-transparent  flex justify-center items-center"
        >
          <i className="  text-4xl material-icons  mobile:text-3xl"> notifications_active </i>
          <div className="text-sm font-semibold text-red-500 absolute -top-1 -right-3">
            45
          </div>
        </NavLink>
        <NavLink to={'/upload'} className="border-b-4 border-transparent  flex justify-center items-center">
          <i className=" text-4xl  material-icons  mobile:text-3xl">add_circle </i>
        </NavLink>
        <div>
          <i className="text-4xl material-icons  mobile:text-3xl ">chat</i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
