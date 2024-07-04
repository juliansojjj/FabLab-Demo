import React, {useState} from 'react'
import './Profile.css'
import {useNavigate, Outlet, Navigate, useLocation} from 'react-router-dom' 
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../../features/content/contentSlice';

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