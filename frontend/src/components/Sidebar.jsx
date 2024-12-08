import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-white w-56 shadow-2xl  flex flex-col ">
   <div className="px-4 py-2">
       <p className="text-xl font-bold italic text-red-600">Hey!</p>
       <p className="text-lg font-medium">Lekhansh Sachan</p>
      </div>
     <hr />
    
    

        
      <Link to={'/profile'} className="px-4 py-2 flex items-center justify-between text-lg font-semibold cursor-pointer hover:bg-gray-200">
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

      <div className="px-4 py-2 flex items-center gap-4 text-lg font-semibold cursor-pointer hover:bg-gray-200">
        <i className="material-icons">logout</i>
        <p >Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
