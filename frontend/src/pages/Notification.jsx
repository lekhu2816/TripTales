import React, { useState } from 'react'
import img from '../assets/img3.jpg'
const Notification = () => {
  const [notification,setNotification]=useState([1,2,3,4,5,6,7,5,8,9,0])
  return (
    <div className='flex justify-center'>
      <div className=' w-[35%] flex flex-col gap-2'>
       {
          notification.map(()=>(
            <div className=' flex items-center gap-2 justify-center hover:bg-slate-200 p-1'>
            <img className='w-10 h-10 rounded-full' src={img} alt="" />
            <p className='font-medium'>Lekhumsd_2806</p>
            <p>likes your photo</p>
            <img className='w-12 rounded-md' src={img} alt="" />
          </div>
          ))
       }
      </div>
    </div>
  )
}

export default Notification