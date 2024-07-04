import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { selectUserLogin } from '../../features/content/contentSlice';
import './Profile.css';

const Verification = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [session,setSession] = useState(true)
    const login = useSelector(selectUserLogin)

      return(
        login 
          ? <Outlet/> 
          : <Navigate to='/login' state={{from:location}} replace/>
      )
}

export default Verification