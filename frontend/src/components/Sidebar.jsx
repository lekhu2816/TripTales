import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
const Sidebar = () => {
  const { SERVER_URL, setIsAuthenticated } = useContext(AppContext);
  const logout = async () => {
    const url = `${SERVER_URL}/api/auth/logout`;
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      if (response.status == 200) {
        toast.success(response.data.message);
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", false);
      }
    } catch (error) {
      if(response.status==400||response.status==500){
        toast.error(error.response.data,message)
      }
    }
  };
  return (
    <div className="bg-white w-56 shadow-2xl  flex flex-col ">
      <div className="px-4 py-2">
        <p className="text-xl font-bold italic text-red-600">Hey!</p>
        <p className="text-lg font-medium">Lekhansh Sachan</p>
      </div>
      <hr />

      <Link
        to={"/profile"}
        className="px-4 py-2 flex items-center justify-between text-lg font-semibold cursor-pointer hover:bg-gray-200"
      >
        <div className="flex items-center gap-4">
          <i className="material-icons">person</i>
          <p>Profile</p>
        </div>
        <i className="material-icons">chevron_right</i>
      </Link>

      <div className="px-4 py-2 flex items-center justify-between text-lg font-semibold cursor-pointer hover:bg-gray-200">
        <div className="flex items-center gap-4">
          <i className="material-icons">settings</i>
          <p>Setting</p>
        </div>
        <i className="material-icons">chevron_right</i>
      </div>

      <div className="px-4 py-2 flex items-center gap-4 text-lg font-semibold cursor-pointer hover:bg-gray-200">
        <i className="material-icons">dark_mode</i>
        <p>Display</p>
      </div>

      <div
        onClick={logout}
        className="px-4 py-2 flex items-center gap-4 text-lg font-semibold cursor-pointer hover:bg-gray-200"
      >
        <i className="material-icons">logout</i>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
