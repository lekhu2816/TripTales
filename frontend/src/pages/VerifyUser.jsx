import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



const VerifyUser = () => {
    const location=useLocation();
    const email=location.state;
    const [otp,setOtp]=useState(["","","","","",""])
    const inputRef=useRef([])
  
    const handleChange=(e,index)=>{
     const value=e.target.value
     if (/^\d?$/.test(value)){
        const newOtp=[...otp];
        newOtp[index]=value;
        setOtp(newOtp);
     }
     if (value != "" && index < otp.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
    const keyDownEvent = (e, index) => {
        if (e.key == "Backspace" && !otp[index] && index > 0) {
          inputRef.current[index - 1].focus();
        }
      };
     const handleSubmit=async()=>{
        let verificationToken="";
        for(let index in otp){
            verificationToken=verificationToken+ otp[index];
        }
       
     }
    const [counter,setCounter]=useState(59);
    const counterFunction=()=>{
        const interval = setInterval(() => {
            setCounter((prevCounter) => {
              if (prevCounter <= 0) {
                clearInterval(interval);
                return 0;
              }
              return prevCounter - 1;
            });
          }, 1000);
    }
    useEffect(() => {
        counterFunction()
      }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-50 ">
      <div className="text-center my-4">
        <h1 className="text-primary text-2xl font-bold">Verify your email</h1>
        <p className="text-secondary">Enter the 6-digit code send to your Email address</p>
      </div>
       <div className='flex flex-col gap-2 w-[60%] mobile:w-[90%]'>
       <form  className=' flex justify-between'>
        {
          otp.map((val,index)=>{
              return(
                <div key={index} className='border-[1px] border-black text-2xl rounded-[5px]'>
                    <input
                     className='rounded-[5px]  w-[40px] aspect-square flex justify-center text-center'
                     onChange={(e) => {
                        handleChange(e, index);
                      }}
                      ref={(element) => {
                        inputRef.current[index] = element;
                      }}
                      value={otp[index]} 
                      onKeyDown={(e) => keyDownEvent(e, index)}
                      type="text"
                       maxLength={1}/>
                </div>
              )
          })
        }
        
       </form>
       <div className='flex justify-between'>
        <p className='text-[14px] text-right  text-slate-800'>Time Remaining : <span className='font-medium'>{counter}</span></p>
        {
            (counter>0)?<p className='text-[14px] text-right  text-gray-300 underline'>Resend OTP</p>:<p onClick={()=>{setCounter(59),counterFunction()}} className='text-[14px] text-right  text-red-500 underline cursor-pointer'>Resend OTP</p>
        }
       </div>
       
       <button onClick={handleSubmit} className='my-2 py-1 bg-primary text-white w-full rounded-[5px]'>verify</button>
       </div>
    </div>
  )
}

export default VerifyUser