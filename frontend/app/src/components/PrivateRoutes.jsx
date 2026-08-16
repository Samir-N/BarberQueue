import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoutes() {

    const {user} = useSelector((state) => state.auth);
    
    try{

        const response = 'api/v1/user/getUserData'

    }
    catch(e){console.log(e)}

    if(localStorage.getItem("token")){
        return  <Outlet />
    }
    else{
        return <Navigate to="/barber/login" />
    }
}

export default PrivateRoutes
