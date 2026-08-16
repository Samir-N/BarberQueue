import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
const PublicRoutes = () => {

    if(localStorage.getItem("token")){
       return <Navigate to="/"/>
}
else{
    return <Outlet />
}   

}

export default PublicRoutes
