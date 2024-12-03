import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/Context';

const Home = () => {
  const {setShowDropdown}=useContext(AppContext);
  useEffect(()=>{
    setShowDropdown(false)
  },[])
  return (
    <div onClick={()=>setShowDropdown(false)}  className='text-6xl'>Home</div>
  )
}

export default Home