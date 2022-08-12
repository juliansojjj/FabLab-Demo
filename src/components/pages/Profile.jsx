import React,{useState} from 'react'
import Header from '../Header'
import {signOut} from 'firebase/auth'
import {auth} from '../../firebase'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery, useGetUserMutation } from '../../app/cardsApi'
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { onAuthStateChanged, deleteUser } from 'firebase/auth'
import { useEffect } from 'react'

const Profile = () => {
  const navigate = useNavigate()

  const {data,error} = useGetUsersQuery()
  const [snackbar,setSnackbar] = useState()
  const [eliminateOption,setEliminateOption] = useState()
  const [getUser,{data:info,error:err}] = useGetUserMutation()
  const [email,setEmail] = useState()
  const [user,setUser] = useState()

  useEffect(()=>{
    if(auth.currentUser){
      console.log(auth.currentUser)
      setEmail(auth.currentUser.email)
      setUser(auth.currentUser)
      const id = auth.currentUser.uid
      getUser(id)
    }
  },[auth.currentUser])

  console.log(info)

  const logout = (e)=>{
    signOut(auth).then(()=>{
      console.log('Sesión cerrada')
      navigate('/')
      window.location.reload()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const adminHandle = async(e)=>{
    const id = e.target.attributes.getNamedItem("userid").value;
    const admin = e.target.attributes.getNamedItem("admin").value;
    const docRef = doc(db,'Users',id)
    if(admin == 'false'){
      let data = {admin:'true'}
      await updateDoc(docRef,data).then(setSnackbar('Actualize la página para ver los cambios'))
      .catch((err)=>{console.log(err.message)})
    }else{
      let data = {admin:'false'}
      await updateDoc(docRef,data).then(setSnackbar('Actualize la página para ver los cambios'))
      .catch((err)=>{console.log(err.message)})
    }
  }

  const eliminateUser = async(e)=>{
    const id = auth.currentUser.uid
    const ref = doc(db,'Users',id)
    await deleteUser(user).then(async()=>{
      await deleteDoc(ref)
    })
    .catch((err)=>{if(err.message == 'Firebase: Error (auth/requires-recent-login).'){
      setEliminateOption()
      setSnackbar('Debe haber iniciado sesión recientemente para eliminar la cuenta')
    }}) 
  }
  return (
    <div className='base'>
      <Header/>
      {eliminateOption 
        ? <div className='eliminate-container'>
            <div className='eliminate-alert'>
                        <h2>Eliminar Usuario</h2>
                        <p>El usuario se eliminará de manera <b>definitiva</b> ¿Está seguro que desea proseguir?</p>
                        <button className='eliminate-confirm' onClick={eliminateUser}>Eliminar</button>
                        <button className='eliminate-cancel' onClick={(e)=>{setEliminateOption(false)}}>Cancelar</button>
            </div>
            <div className='eliminate-background'></div>
            </div> 
        : ''}

        {snackbar 
        ? <div className='snackbar'>
              <span>{snackbar}</span>
              <span className='snackbar-btn' onClick={(e)=>{setSnackbar()}}>X</span>
            </div> 
        : ''}

          <main>
            <h1 className='title-bottom'>{info ? info.user : ''}</h1>

            {auth ? 
            <div className='user-info'>
              <div>
                Dirección de email
                <div className='user-email'>{email ? email : ''}</div>
              </div>
              <div>
                Contraseña
                <div className='user-pass'>*******</div>
              </div>
            </div>
            : ''}

            <button onClick={logout} className='logout-button'>Cerrar Sesión</button>
            <button onClick={(e)=>{setEliminateOption(true)}} className='logout-button'>Eliminar Usuario</button>
            
            {info?.admin == 'main' 
            ? <div className='users-list'>
              {data  
                ? data.map(item=>{
                  return(
                <div className='users-list--item' key={item.id}>
                  <span>{item.user}</span>
                  <span>{item.email}</span>
                  <div>
                    <span><b>Administrador</b>:{item.admin=='false' ? 'No' : 'Sí'}</span>
                    <button onClick={adminHandle} userid={item.id} admin={item.admin}>{item.admin=='false' ? 'Habilitar' : 'Desabilitar'}</button>
                   </div>
                </div>
              )})
            : 'Loading...'}
            </div>
            : '' }
          </main>
    </div>
  )
}

export default Profile