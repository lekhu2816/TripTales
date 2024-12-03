import React, { createContext, useState } from 'react'
import App from '../App'
export const AppContext=createContext(null)
const Context = (props) => {
  const [showDropdown,setShowDropdown]=useState(false);
  const contextValue={
    showDropdown,setShowDropdown
  };
  return (
  <AppContext.Provider value={contextValue}>
    {props.children}
  </AppContext.Provider>
  )
}

export default Context