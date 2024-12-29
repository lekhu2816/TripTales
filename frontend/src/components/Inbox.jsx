import React, { useContext, useEffect, useId, useRef, useState } from "react";
import { AppContext } from "../context/Context";
import { Loader3 } from "./Loader";
import axios from "axios";

const Inbox = () => {
  const { SERVER_URL, message, setMessage, selectedUser, userData ,socket} =
  useContext(AppContext);
  const userId = userData?._id;
  const inputRef = useRef();
  const chatContainerRef = useRef();
  const [loading, setLoading] = useState(false);


  

  // -------------------get all the messages-------------------//

  const getMessages = async (recieverId) => {
    setLoading(true);
    const url = `${SERVER_URL}/api/message/get/${recieverId}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response.status == 200) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedUser && selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  // -----------sending message---------------------//

  const sendMessage = async () => {
    const url = `${SERVER_URL}/api/message/send/${selectedUser?._id}`;
    try {
      const response = await axios.post(
        url,
        { message: inputRef.current.value },
        { withCredentials: true }
      );
      if (response.status == 200) {
        setMessage([...message, response.data.newMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // --------realtime socket implementaion-------------------//
  console.log(message)
  
  return (
    <div className="relative bg-gray-100 w-full h-[90vh]">
      <div className="sticky top-0 bg-gray-200 w-full flex justify-between items-center px-2 py-1">
        <div className="flex items-center gap-4">
          <img
            className="w-10 h-10 rounded-full"
            src={selectedUser.profilePhoto}
            alt=""
          />
          <p className="font-semibold">{selectedUser.userName}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-green-600">Online</p>
        </div>
      </div>

      {/* ---------chat section----------------*/}

      <div
        ref={chatContainerRef}
        className="h-[72vh] tablet:h-[65vh] p-4 overflow-y-auto no-scrollbar"
      >
        {loading ? (
          <Loader3></Loader3>
        ) : message.length == 0 ? (
          <div className="text-center text-lg font-medium">
            Say Hii &#128075; to start conversation
          </div>
        ) : (
          message.map((message, index) => {
            return (
              <>
                <div
                  key={index}
                  className={`${
                    userId == message.senderId ? "chat-end" : "chat-start"
                  } chat `}
                >
                  <div
                    className={`chat-bubble ${
                      userId == message.senderId
                        ? "bg-green-300"
                        : "bg-slate-300"
                    }  text-black`}
                  >
                    {message.message}
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>

      {/* ----------send message section-------- */}

      <div className=" bg-gray-200 w-full p-4 flex gap-4 items-center">
        <i className="fa-solid fa-paperclip "></i>
        <input
          ref={inputRef}
          className="outline-none w-full bg-transparent"
          type="text"
          placeholder="Type a message"
        />
        <i onClick={sendMessage} className="fa-regular fa-paper-plane"></i>
      </div>
    </div>
  );
};

export default Inbox;
