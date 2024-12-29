import React, { useContext, useEffect } from "react";
import {io} from 'socket.io-client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerifyUser from "./pages/VerifyUser";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Explore from "./pages/Explore";
import Notification from "./pages/Notification";
import Posts from "./components/Posts";
import Gallery from "./components/Gallery";
import Saved from "./components/Saved";
import Upload from "./pages/Upload";
import UploadPost from "./components/UploadPost";
import UploadGallery from "./components/UploadGallery";
import ProtectedRoutes from "./ProtectedRoutes";
import Chat from "./pages/Chat";
import { AppContext } from "./context/Context";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <RootLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile/:id" element={<Profile />}>
          <Route index element={<Posts />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="saved" element={<Saved />} />
        </Route>
        <Route path="edit" element={<EditProfile />} />
        <Route path="explore" element={<Explore />} />
        <Route path="notifications" element={<Notification />} />
        <Route path="upload" element={<Upload />}>
          <Route index element={<UploadPost />} />
          <Route path="gallery" element={<UploadGallery />} />
        </Route>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<VerifyUser />} />
      </Route>
    </>
  )
);

const App = () => {
  
  const {userData,SERVER_URL, setSocket,setOnlineUsers,socket}=useContext(AppContext)
  useEffect(()=>{
   if(userData){
    const socketio=io(SERVER_URL,{
      query:{
        userId:userData?._id
      },
      transports:['websocket']
    })
    
    setSocket(socketio)
    

    socketio.on('getOnlineUsers',(onlineUsers)=>{
      setOnlineUsers(onlineUsers);
    })

    return ()=>{
      socketio.close()
      setSocket(null)
     
    }
   }
   else{
    return ()=>{
      socket.close()
      setSocket(null)
     
    }
   }
  },[userData])

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
