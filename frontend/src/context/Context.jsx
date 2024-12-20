import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext(null);
import axios from "axios";
import { toast } from "react-toastify";
const Context = (props) => {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    userName: "",
    profilePhoto: "",
    coverPhoto: "",
    bio: "",
    bookmarks: [],
    following: [],
  });
  const SERVER_URL = "http://localhost:5001";
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [postDropdown, setPostDropdown] = useState({
    show: false,
    userId: "",
    postId: "",
  });
  const [showPostDialog, setShowPostDialog] = useState({
    show: false,
    postId: "",
  });
  const [post, setPost] = useState([]);

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

  //-------------fetch user data--------------------//

  const fetchUserData = async () => {
    const url = `${SERVER_URL}/api/user/get-profile`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response.status == 200) {
        setUserData(response.data.user);
      }
    } catch (error) {
      if (error.status == 401) {
        logout();
      }
    }
  };

  // ----------------------get all posts---------------------//

  const getPosts = async () => {
    const url = `${SERVER_URL}/api/post/get-all`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response.status == 200) {
        setPost(response.data.posts);
      }
    } catch (error) {
      if (error.status == 401) {
        logout();
      }
    }
  };

  //-------------------------- get suggested users------------------------//
  const [suggestedUser, setSuggestedUser] = useState([]);

  const fetchSuggestedUsers = async () => {
    const url = `${SERVER_URL}/api/user/suggested-user`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response.status == 200) {
        setSuggestedUser(response.data.suggestedUser);
      }
    } catch (error) {
      if (error.status == 401) {
        logout();
      }
    }
  };

  // --------------------------Chatting controls-------------------------//

  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState([]);

  const contextValue = {
    SERVER_URL,
    showDropdown,
    setShowDropdown,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    userData,
    setUserData,
    fetchUserData,
    showPostDialog,
    setShowPostDialog,
    postDropdown,
    setPostDropdown,
    post,
    setPost,
    getPosts,
    selectedUser,
    setSelectedUser,
    socket,
    setSocket,
    onlineUsers,
    setOnlineUsers,
    suggestedUser,
    message,
    setMessage
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isAuthenticated"))) {
      fetchUserData();
      getPosts();
      fetchSuggestedUsers();
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
