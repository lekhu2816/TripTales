import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({name:"", email: "", password: "" });
  
  const onHandleChange=(event)=>{
    console.log(userData)
    const {name,value}=event.target
    setUserData((prev)=>({...prev,[name]:value}))
  }
  const onHandleSubmit=async(event)=>{
    event.preventDefault();
    navigate('/auth/verify')
  }
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-50">
      <div className="text-center my-4">
        <h1 className="text-primary text-2xl font-bold">Welcome</h1>
        <p className="text-secondary">Signup to your create account</p>
      </div>
      <form onSubmit={onHandleSubmit} className=" p-2 flex flex-col gap-4 w-[70%] mobile:w-full">

        {/* --------------------------username---------------------------- */}
        <div className="p-2 flex items-center gap-2 border border-black rounded-sm">
          <i className="material-icons">person</i>
          <input
            className="outline-none w-full"
            type="text"
            name="name"
            value={userData.name}
            placeholder="Username"
            onChange={onHandleChange}
          />
        </div>
        {/* --------------------------Email-------------------------------- */}

        <div className="p-2 flex items-center gap-2 border border-black rounded-sm">
          <i className="material-icons">email</i>
          <input
            className="outline-none w-full"
            type="email"
            name="email"
            value={userData.email}
            placeholder="Email"
            onChange={onHandleChange}
          />
        </div>

        {/* -------------------------Password------------------------------- */}

        <div className="p-2 flex items-center gap-2 border border-black rounded-sm ">
          <i className="material-icons">lock</i>
          <input
            className="outline-none w-full"
            type={showPassword ? "text" : "password"}
            name="password"
            value={userData.password}
            placeholder="Password"
            onChange={onHandleChange}
          />
          <i
            onClick={() => setShowPassword((prev) => !prev)}
            className="material-icons cursor-pointer"
          >
            {!showPassword ? "visibility" : "visibility_off"}
          </i>
        </div>

        {/* ---------------------------Login button-------------------------- */}

        <button className="p-1 text-xl bg-primary text-white font-medium rounded-sm">
          Create Account
        </button>
      </form>
      <p className="my-4">
        Already have account ?{" "}
        <span
          onClick={() => {
            navigate("/auth/signin");
          }}
          className="cursor-pointer underline"
        >
         Signin
        </span>
      </p>
    </div>
  );
};

export default Signup;
