import React, {useState} from 'react'
import './Profile.css'
import { auth } from '../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {useNavigate, Outlet, Navigate, useLocation} from 'react-router-dom' 
import { useEffect } from 'react';
import { useGetUserMutation } from '../../app/cardsApi';

const Verification = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [getUser,{data,error}] = useGetUserMutation()
    const [session,setSession] = useState(true)

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          console.log(user.uid)
          getUser(user.uid)
        } else setSession(false)
      })
    },[])

    console.log(auth)
    console.log(data)

    const logout = (e)=>{
        signOut(auth).then(()=>{
          console.log('Sesión cerrada')
          window.location.reload()
        }).catch((err)=>{
          console.log(err)
        })
      }

      return(
        session 
        ? data?.admin 
          ? data?.admin !== 'false'
          ? <Outlet/> 
          : <main>
              <h1>Su usuario no está habilitado para ingresar :(</h1>
              <h2>Comuníquese con un administrador para solucionarlo</h2>
              <button onClick={logout} className='logout-button'>Cerrar Sesión</button>
            </main>
          : <main>
              <h1>Su usuario no está habilitado para ingresar :(</h1>
              <h2>Comuníquese con un administrador para solucionarlo</h2>
              <button onClick={logout} className='logout-button'>Cerrar Sesión</button>
            </main>
        : <Navigate to='/login' state={{from:location}} replace/>
      )
}

export default Verification