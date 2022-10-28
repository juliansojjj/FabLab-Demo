import React, { useState } from 'react'
import Header from '../Header'
import './Table.css'
import { useGetUsersQuery, useGetDocsQuery } from '../../app/cardsApi'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import Alert from "../../icons/triangle-alert-empty.svg"
import Xmark from "../../icons/xmark-solid.svg"

const Table = () => {
  const { data, error } = useGetUsersQuery()
  const { data: info, error: err } = useGetDocsQuery()
  const [alert, setAlert] = useState(false)

  const updateToComplete = async (id) =>{
    try{
      const docRef = doc(db,'card',id)
      const data = {state:'complete'}
      updateDoc(docRef,data).then(console.log('Complete Now'))
      .catch((err)=>{console.log(err.message)})
  }catch(err){
      return {error:err}
  }
  }

  const updateToIncomplete = async (id) =>{
    try{
      const docRef = doc(db,'card',id)
      const data = {state:'incomplete'}
      updateDoc(docRef,data).then(console.log('Incomplete Now'))
      .catch((err)=>{console.log(err.message)})
  }catch(err){
      return {error:err}
  }
  }

  const alertManage = (msg) => {
    if (alert) setAlert(false);
    else if (!alert) {
      setAlert(msg);
      setTimeout(() => { setAlert(false) }, 4000)
    }
  }

  const manageState = async (e) => {
    e.preventDefault()
    const state = e.target.getAttribute("data-state");
    const id = e.target.getAttribute("data-id");
    console.log(state)
    console.log(id)
    if(state == 'complete'){
      updateToIncomplete(id)
      alertManage('Actualice la página para ver los cambios')
    }
    else{
      updateToComplete(id)
      alertManage('Actualice la página para ver los cambios')
    }
  }

  return (
    <div className='base'>
      <Header />
      <main>
        <h2 className='table-title'>List view</h2>
        {data
          ? <div>
            <div className='table-column'>
              <span>Alumno</span>
              <span>Archivos</span>
              <span>Estados</span>
            </div>
            {data.map(item => {
              if (item.student == 'true') {
                return (
                  <div className='table-item' key={item.id}>
                    <span>{item.user}</span>
                    <div className='table-item--container'>
                      {item.cards.map(card => {
                        return (
                          <div className='table-container--child' key={card}>
                            <Link to={`/card/${card}`} className='table-link' >
                              {info.map(doc => {
                                if (doc.id == card) {
                                  return (
                                    <span>{doc.title}</span>
                                  )
                                }
                              })}
                            </Link>
                            {info.map(doc => {
                              if (doc.id == card) {
                                return (
                                  <button
                                    className={`table-${doc.state}-btn`}
                                    onClick={manageState}
                                    data-state={doc.state}
                                    data-id={doc.id}>
                                    {doc.state == 'complete'
                                      ? 'Marcar como incompleto'
                                      : 'Marcar como completo'}
                                  </button>
                                )
                              }
                            })}
                          </div>)
                      }
                      )}
                    </div>
                  </div>
                )
              }
            })}
          </div>
          : 'Loading...'}

        {alert ?
          <div className='table-alert'>
            <img src={Alert} className='table-alert-sign' />
            <span className='table-alert-msg'>Refresque la página para ver los cambios</span>
            <img className='table-alert-btn' onClick={alertManage} src={Xmark} />
          </div>
          : ''}

      </main>
    </div>
  )
}

export default Table