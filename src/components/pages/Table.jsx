import React, { useState } from 'react'
import Header from '../Header'
import './Table.css'
import { Link } from 'react-router-dom'
import Alert from "../../icons/triangle-alert-empty.svg"
import Xmark from "../../icons/xmark-solid.svg"
import { useDispatch, useSelector } from 'react-redux'
import { selectCards, selectUsers, cardModification } from '../../features/content/contentSlice'

const Table = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectUsers)
  const info = useSelector(selectCards)
  const [alert, setAlert] = useState(false)

  const stateHandle = (e) =>{
    e.preventDefault()
    const cardId = e.currentTarget.attributes.getNamedItem("data-cardid").value;
    const state = e.currentTarget.attributes.getNamedItem("data-state").value;
    console.log(state)
    console.log(cardId)
    if (state === 'complete')  dispatch(cardModification({operation:'state',cardId:cardId,value:'incomplete'}));
    else                      dispatch(cardModification({operation:'state',cardId:cardId,value:'complete'}));  

  }

  const alertManage = (msg) => {
    if (alert) setAlert(false);
    else if (!alert) {
      setAlert(msg);
      setTimeout(() => { setAlert(false) }, 4000)
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
              if (!item.admin) {
                return (
                  <div className='table-item' key={item.id}>
                    <span className={item.student === 'false' && 'bannedStudent'}>{item.userName}</span>
                    <div className='table-item--container'>
                      {item.cards.map(card => {
                        return (
                          <div className='table-container--child' key={card}>
                            <Link to={`/card/${card}`} className='table-link' >
                              {info.map(doc => {
                                if (doc.id === card) {
                                  return (
                                    <span>{doc.title}</span>
                                  )
                                }
                              })}
                            </Link>
                            {info.map(doc => {
                              if (doc.id === card) {
                                return (
                                  <button
                                    className={`table-${doc.state}-btn`}
                                    onClick={stateHandle}
                                    data-state={doc.state}
                                    data-cardid={doc.id}>
                                    {doc.state === 'complete'
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