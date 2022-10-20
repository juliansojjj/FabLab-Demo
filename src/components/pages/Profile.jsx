import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery, useGetUserMutation } from '../../app/cardsApi'
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { onAuthStateChanged, deleteUser, updatePassword } from 'firebase/auth'
import Edit from '../../icons/edit-pen.svg'
import Alert from "../../icons/triangle-alert-empty.svg"
import Xmark from "../../icons/xmark-solid.svg"
import Check from '../../icons/check-solid.svg'

const Profile = () => {
  const navigate = useNavigate()

  const { data, error } = useGetUsersQuery()
  const [alert, setAlert] = useState(false)
  const [eliminateOption, setEliminateOption] = useState()
  const [getUser, { data: info, error: err }] = useGetUserMutation()
  const [email, setEmail] = useState()
  const [user, setUser] = useState()
  const [editPass, setEditPass] = useState(false)
  const [passError, setPassError] = useState()
  const passMsgErrors = ['Firebase: Error (auth/requires-recent-login).',
    'Firebase: Password should be at least 6 characters (auth/weak-password).']
  const [successAlert, setSuccessAlert] = useState(false)

  useEffect(() => {
    if (auth.currentUser) {
      console.log(auth.currentUser)
      setEmail(auth.currentUser.email)
      setUser(auth.currentUser)
      const id = auth.currentUser.uid
      getUser(id)
    }
  }, [auth.currentUser])

  const logout = (e) => {
    signOut(auth).then(() => {
      console.log('Sesión cerrada')
      navigate('/')
      window.location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }

  const adminHandle = async (e) => {
    const id = e.target.attributes.getNamedItem("data-userid").value;
    const admin = e.target.attributes.getNamedItem("data-admin").value;
    const operation = e.target.attributes.getNamedItem("data-operation").value; 
    console.log(operation)
    const docRef = doc(db, 'Users', id)
    if (admin == 'false' && operation == 'true') {
      let data = { admin: 'true' }
      await updateDoc(docRef, data).then(alertManage('Actualize la página para ver los cambios'))
        .catch((err) => { console.log(err.message) })
    } 
    else if (admin == 'true' && operation == 'false'){
      let data = { admin: 'false' }
      await updateDoc(docRef, data).then(alertManage('Actualize la página para ver los cambios'))
        .catch((err) => { console.log(err.message) })
    } 
    else if (admin == 'true' && operation == 'admin'){
      let data = { admin: 'admin' }
      await updateDoc(docRef, data).then(alertManage('Actualize la página para ver los cambios'))
        .catch((err) => { console.log(err.message) })
    }
    else if (admin == 'admin' && operation == 'true'){
      let data = { admin: 'true' }
      await updateDoc(docRef, data).then(alertManage('Actualize la página para ver los cambios'))
        .catch((err) => { console.log(err.message) })
    }
  }

  const eliminateUser = async (e) => {
    const id = auth.currentUser.uid
    const ref = doc(db, 'Users', id)
    await deleteUser(user).then(async () => {
      await deleteDoc(ref)
    })
      .catch((err) => {
        if (err.message == 'Firebase: Error (auth/requires-recent-login).') {
          setEliminateOption()
          alertManage('Debe haber iniciado sesión recientemente para eliminar la cuenta')
        }
      })
  }

  const managePass = (e) => {
    if (!editPass) setEditPass(true)
    else setEditPass(false)
  }

  const updatePass = (e) => {
    e.preventDefault()
    const mainPass = e.target.passInputMain.value
    const repeatPass = e.target.passInputRepeat.value
    if (mainPass != repeatPass) setPassError('Las contraseñas no coinciden')
    else {
      updatePassword(auth.currentUser, mainPass)
        .then(() => {
          console.log('contraseña cambiada exitosamente')
          successAlertManage('Contraseña cambiada exitosamente')
          setPassError()
          setEditPass(false)
        })
        .catch(err => {
          console.log(err.message)
          setPassError(err.message)
        })
    }
  }

  const alertManage = (msg) => {
    console.log(msg)
    if (alert) setAlert(false);
    else if (!alert) {
      setAlert(msg);
      setTimeout(() => { setAlert(false) }, 4000)
    }
  }

  const successAlertManage = (msg) => {
    console.log(msg)
    if (successAlert) setSuccessAlert(false);
    else if (!successAlert) {
      setSuccessAlert(msg);
      setTimeout(() => { setSuccessAlert(false) }, 4000)
    }
  }

  return (
    <div className='base'>
      <Header />
      {eliminateOption
        ? <div className='eliminate-container'>
          <div className='eliminate-alert'>
            <h2>Eliminar Usuario</h2>
            <p>El usuario se eliminará de manera <b>definitiva</b> ¿Está seguro que desea proseguir?</p>
            <button className='eliminate-confirm' onClick={eliminateUser}>Eliminar</button>
            <button className='eliminate-cancel' onClick={(e) => { setEliminateOption(false) }}>Cancelar</button>
          </div>
          <div className='eliminate-background'></div>
        </div>
        : ''}

      {alert ?
        <div className='profile-alert'>
          <img src={Alert} className='profile-alert-sign' />
          <span className='profile-alert-msg'>{alert}</span>
          <img className='profile-alert-btn' onClick={alertManage} src={Xmark} />
        </div>
        : ''}

      {successAlert ?
        <div className='profile-successAlert'>
          <span className='profile-successAlert-msg'>{successAlert}</span>
          <img className='profile-successAlert-btn' onClick={successAlertManage} src={Xmark} />
        </div>
        : ''}

      <main>
        <h1 className='title-bottom'>{info ? info.user : ''}</h1>

        {auth ?
          <div className='user-info'>
            <div>
              <span>Dirección de email</span>
              <div className='user-email'>{email ? email : ''}</div>
            </div>
            <div className='user-pass'>
              <span>Contraseña</span>
              <div className='user-pass--btn'>
                {editPass
                  ? <button className='pass-btn--confirm' form='user-pass--form' type='submit'>
                    <img src={Check} />
                  </button>
                  : <button className='pass-btn--edit' onClick={managePass}>
                    <img src={Edit} />
                  </button>
                }
                {editPass
                  ? <button className='pass-btn--cancel' onClick={managePass}>
                    <img src={Xmark} />
                  </button>
                  : ''}
              </div>
              {editPass
                ? <form onSubmit={updatePass} className='user-pass--form' id='user-pass--form'>
                  <input type="password" name='passInputMain' className='pass-form--input' required />
                  <span>Repita la contraseña</span>
                  <input type="password" name='passInputRepeat' className='pass-form--input' required />
                  {passError
                    ? <span className='pass-form--error'>
                      {passError == passMsgErrors[0]
                        ? 'Su sesión es demasiado vieja, vuelva a iniciar sesión'
                        : passError == passMsgErrors[1]
                          ? 'La contraseña debe tener como mínimo 6 caracteres'
                          : passError}
                    </span>
                    : ''}
                </form>
                : <div className='user-pass--show'>*******</div>}
            </div>
          </div>
          : ''}

        {info?.admin == 'main'
          ? <div className='users-list'>
            <h3 className='users-list-title'>Lista de administradores</h3>
            <div className='users-list-column'>
              <span>Nombre</span>
              <span>Mail</span>
              <span>Administrador</span>
            </div>
            {data
              ? data.map(item => {
                return (
                  <div className='users-list--item' key={item.id}>
                    <span>{item.user}</span>
                    <span>{item.email}</span>
                    <div>
                      <span><b>Administrador</b>:{item.admin == 'false' ? 'No' : item.admin == 'admin' ? 'Admin' : 'Si'}</span>
                      {item.user !== info.user
                        ? <div>
                          <button
                            onClick={adminHandle}
                            data-userid={item.id}
                            data-admin={item.admin}
                            className='users-list--btn'
                            data-operation={item.admin == 'false' ? 'true' : 'false'}>
                              {item.admin == 'false' ? 'Habilitar' : 'Deshabilitar'}
                          </button>
                          {item.admin == 'true' || item.admin == 'admin'
                            ? <button
                              className='users-list--btn'
                              onClick={adminHandle}
                              data-userid={item.id}
                              data-admin={item.admin}
                              data-operation={item.admin == 'admin' ? 'true' : 'admin'}>
                                {item.admin == 'admin' ? 'Descender rango' : 'Aumentar rango'}
                            </button>
                            : ''}
                        </div>
                        : ''}
                    </div>
                  </div>
                )
              })
              : 'Loading...'}
          </div>
          : ''}

        <button onClick={logout} className='account-button account-logout'>Cerrar Sesión</button>
        <button onClick={(e) => { setEliminateOption(true) }} className='account-button'>Eliminar Usuario</button>
      </main>
    </div>
  )
}

export default Profile