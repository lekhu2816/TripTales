import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext(null);
const Context = (props) => {
  const SERVER_URL="http://localhost:5001";
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const contextValue = {
    SERVER_URL,
    showDropdown,
    setShowDropdown,
    isAuthenticated,
    setIsAuthenticated
  };
   
  useEffect(()=>{
   setIsAuthenticated(JSON.parse(localStorage.getItem('isAuthenticated')))
  },[])

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default Context;
