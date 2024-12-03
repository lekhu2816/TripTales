import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const RootLayout = () => {
  return (
    <>
      <Navbar />

      <div className="mt-16 mx-10 tablet:mx-5 mobile:mx-2">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
