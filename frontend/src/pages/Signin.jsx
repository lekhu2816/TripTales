import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onHandleChange=(event)=>{
    console.log(userData)
    const {name,value}=event.target
    setUserData((prev)=>({...prev,[name]:value}))
  }
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-50">
      <div className="text-center my-4">
        <h1 className="text-primary text-2xl font-bold">Welcome Back!</h1>
        <p className="text-secondary">Signin to your account</p>
      </div>
      <form className=" p-2 flex flex-col gap-4 w-[70%] mobile:w-full">
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
          Login
        </button>
      </form>
      <p className="my-4">
        Don't have account ?{" "}
        <span
          onClick={() => {
            navigate("/auth/signup");
          }}
          className="cursor-pointer underline"
        >
          Create Account
        </span>
      </p>
    </div>
  );
};

export default Signin;
