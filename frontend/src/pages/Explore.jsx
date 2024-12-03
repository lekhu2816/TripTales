import React, { useContext ,useEffect } from 'react'
import { AppContext } from '../context/Context'

const Explore = () => {
  const {setShowDropdown}=useContext(AppContext);

  useEffect(()=>{
    setShowDropdown(false)
  },[])
  return (
    <div onClick={()=>setShowDropdown(false)}  className='text-6xl'>Explore</div>
  )
}

export default Explore