import React, { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostDialog from "../components/PostDialog";
import PostDropdown from "../components/PostDropdown";
import { AppContext } from "../context/Context";
const RootLayout = () => {
  const {showPostDialog,postDropdown}=useContext(AppContext);
   
  return (
    <>
      <Navbar />
        <div className="mt-16 mx-10 tablet:mx-5 mobile:mx-2">
        <Outlet />
      </div>
     {
      showPostDialog.show? <PostDialog></PostDialog>:<></>
     }
     {
      postDropdown.show?<PostDropdown></PostDropdown>:<></>
     }
    </>
  );
};

export default RootLayout;
