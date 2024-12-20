import React, { useContext } from "react";
import { AppContext } from "../context/Context";
const ChatUser = () => {
  const { onlineUsers, suggestedUser, selectedUser, setSelectedUser } =
    useContext(AppContext);

  return (
    <div className="w-full p-2">
      {/* -----search box making */}
      <div>
        <div className="border-[1px] border-black flex items-center rounded-md ">
          <input
            className="px-2 py-1 outline-none w-full rounded-l-md"
            type="text"
            name=""
            id=""
            placeholder="Search"
          />
          <i className="bg-primary fa-solid fa-magnifying-glass p-2 rounded-r-md text-white"></i>
        </div>
      </div>

      {/* ------------get users */}
      <div className="mt-2 flex flex-col no-scrollbar gap-2  overflow-y-scroll h-[80vh] tablet:h-[70vh]">
        {suggestedUser.map((user, index) => {
          const isOnline=(onlineUsers.includes(user._id));
          return (
            <div
              onClick={() => setSelectedUser(user)}
              key={index}
              className={`${
                user._id == selectedUser?._id ? "bg-gray-200" : ""
              } rounded-md p-2 flex items-center cursor-pointer gap-2 hover:bg-gray-100`}
            >
              <div className="w-10 h-10">
                <img className="rounded-full" src={user.profilePhoto} alt="" />
              </div>
              <div>
                <p className={`${isOnline?"text-green-600":"text-red-600"} text-xs font-bold `}>{isOnline?"Online":"Offline"}</p>
                <p className="font-semibold">{user.userName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatUser;
