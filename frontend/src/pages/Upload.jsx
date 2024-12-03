import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {AppContext} from '../context/Context'
const Upload = () => {
    const {setShowDropdown}=useContext(AppContext);
    useEffect(()=>{
        setShowDropdown(false)
    },[])
  return (
    <div onClick={()=>setShowDropdown(false)} className='flex justify-center mobile:mb-16'>
        <Outlet/>
    </div>
  )
}

export default Upload