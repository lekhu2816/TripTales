import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext(null);
import axios from "axios";
import { toast } from "react-toastify";
const Context = (props) => {
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    userName: "",
    profilePhoto: "",
    coverPhoto: "",
    bio: "",
  });
  const SERVER_URL = "http://localhost:5001";
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState({
    show: false,
    postId: "",
  });

  // -----------------Logout function-----------------------------//

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
      if (error.status == 400 || error.status == 500) {
        toast.error(error.response.data.message);
      }
    }
  };
  const fetchUserData = async () => {
    const url = `${SERVER_URL}/api/user/get-profile`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      console.log(response);
      if (response.status == 200) {
        setUserData(response.data.user);
      }
    } catch (error) {
      if (error.status == 401) {
        logout();
      }
    }
  };

  const contextValue = {
    SERVER_URL,
    showDropdown,
    setShowDropdown,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    userData,
    fetchUserData,
    showPostDialog, 
    setShowPostDialog
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isAuthenticated"))) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("isAuthenticated")));
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default Context;
