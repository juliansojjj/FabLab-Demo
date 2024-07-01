import React, {useState} from 'react'
import './Profile.css'
import { auth } from '../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {useNavigate, Outlet, Navigate, useLocation} from 'react-router-dom' 
import { useEffect } from 'react';
import { useGetUserMutation } from '../../app/cardsApi';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../../features/content/contentSlice';

const Verification = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [getUser,{data,error}] = useGetUserMutation()
    const [session,setSession] = useState(true)
    const login = useSelector(selectUserLogin)

      return(
        login 
          ? <Outlet/> 
          : <Navigate to='/login' state={{from:location}} replace/>
      )
}

export default Verification