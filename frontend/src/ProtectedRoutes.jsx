import React, { useContext, useState } from 'react'
import { AppContext } from './context/Context'
import {Navigate} from 'react-router-dom'
const ProtectedRoutes = ({children}) => {
   
   const {isAuthenticated}=useContext(AppContext);
    if(!isAuthenticated){
        return <Navigate to={'/auth/signin'} replace/>
    }
    return children
}

export default ProtectedRoutes