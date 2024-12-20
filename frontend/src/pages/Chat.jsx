import React, { useContext,  } from "react";
import ChatUser from "../components/ChatUser";
import Inbox from "../components/Inbox";
import { AppContext } from "../context/Context";
const Chat = () => {
  const { selectedUser } = useContext(AppContext);
 

  return (
    <div className=" flex">
      <div className="w-[30%] border">
        <ChatUser></ChatUser>
      </div>
      <div className="w-[70%] ">
        {selectedUser ? <Inbox></Inbox> : <div className="flex justify-center items-center h-[90vh]">
            <div className="flex flex-col justify-center items-center gap-2">
            <i className="fa-regular fa-message text-5xl"></i>
            <p className="text-2xl">Your Messages</p>
            <div className="bg-primary text-sm text-white px-4 py-2 rounded-full">Send messages</div>
            </div>
            </div>}
      </div>
    </div>
  );
};

export default Chat;
