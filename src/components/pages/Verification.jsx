import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectUserLogin } from '../../features/content/contentSlice';
import './Profile.css';

const Verification = () => {
    const location = useLocation()
    const login = useSelector(selectUserLogin)

      return(
        login 
          ? <Outlet/> 
          : <Navigate to='/login' state={{from:location}} replace/>
      )
}

export default Verification