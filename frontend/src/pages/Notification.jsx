import React, { useContext, useEffect, useState } from "react";
import img from "../assets/img3.jpg";
import { AppContext } from "../context/Context";
const Notification = () => {
  const { notification, setNotification, SERVER_URL, userData } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (notification.length == 0) {
      console.log();
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[85vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className=" w-[35%] flex flex-col gap-2">
            {notification.map(() => (
              <div className=" flex items-center gap-2 justify-center hover:bg-slate-200 p-1">
                <img className="w-10 h-10 rounded-full" src={img} alt="" />
                <p className="font-medium">Lekhumsd_2806</p>
                <p>likes your photo</p>
                <img className="w-12 rounded-md" src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
