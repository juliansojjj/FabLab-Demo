import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cardModification, selectAdmin, selectCards } from '../../features/content/contentSlice'
import Menu from '../../icons/menu.svg'
import Alert from "../../icons/triangle-alert-empty.svg"
import Xmark from "../../icons/xmark-solid.svg"
import './Cards.css'

const ArchiveCards = () => {
  const data = useSelector(selectCards)
  const adminLogged = useSelector(selectAdmin)
  const dispatch = useDispatch()
  const [selectMenu, setSelectMenu] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [eliminateOption, setEliminateOption] = useState('')
  const [alert, setAlert] = useState(false)

  const cardMenu = (e) => {
    e.stopPropagation()
    if (!menuOpen) {
      setMenuOpen(true)
      const id = e.target.attributes.getNamedItem("id").value;
      if (!selectMenu) { setSelectMenu(id) }
    }
    else {
      setMenuOpen(false)
      if (selectMenu) { setSelectMenu(null) }
    }
  }

  document.onclick = () => {
    if (menuOpen) {
      setMenuOpen(false)
      setSelectMenu(null)
    }
  }

  const unArchiveCard = async (e) => {
    e.preventDefault()
    const cardId = e.currentTarget.attributes.getNamedItem("data-cardid").value;
    dispatch(cardModification({operation:'archive',cardId:cardId,value:'false'}));  
  }

  const eliminateCard = async (e) => {
    e.preventDefault()
    const cardId = e.currentTarget.attributes.getNamedItem("data-cardid").value;
    dispatch(cardModification({operation:'eliminate',cardId:cardId,value:''})); 
    setEliminateOption(false)
  }

  const alertManage = (e) => {
    if (alert) setAlert(false);
    else if (!alert) {
      setAlert(true);
      setTimeout(() => { setAlert(false) }, 4000)
    }
  }

  return (
    <div className='base'>
      <h1>Cards Archivadas</h1>
      {eliminateOption ? <div className='eliminate-container'>
        <div className='eliminate-alert'>
          <h2>Eliminar Card</h2>
          <p>La card se eliminará de manera <b>definitiva</b> ¿Está seguro que desea deletearla?</p>
          <button className='eliminate-confirm' onClick={eliminateCard} data-cardid={eliminateOption}>Eliminar</button>
          <button className='eliminate-cancel' onClick={(e) => { setEliminateOption(false) }}>Cancelar</button>
        </div>
        <div className='eliminate-background'></div>
      </div> : ''}
      <main>
        {alert ?
          <div className='cards-alert'>
            <img src={Alert} alt='alertLogo' className='cards-alert-sign' />
            <span className='cards-alert-msg'>Refresque la página para ver los cambios</span>
            <img className='cards-alert-btn' alt='errorLogo' onClick={alertManage} src={Xmark} />
          </div>
          : ''}
        <div className='cards-container'>
          {data ? data.map(item => {
            if (item.archive === 'true') {
              return (
                <div key={item.id} className={adminLogged.viewed.find(pos=>pos===item.id) ? `cards-item`: `new-card cards-item`}>
                  <div className='item-menu'>
                    <div className='menu-click'><img src={Menu} alt='MenuLogo' id={`item-click-${item.id}`} onClick={cardMenu} /></div>
                    {menuOpen ?
                      selectMenu === `item-click-${item.id}` ?
                        <div className='archive-menu'>
                          <div className='archive-menu--option' archive={item.archive} onClick={unArchiveCard} data-cardid={item.id}>Desarchivar</div>
                          <div className='archive-menu--option' onClick={(e) => { setEliminateOption(item.id) }}>Eliminar</div>
                        </div> : ''
                      : ''}
                  </div>
                  <Link to={`/card/${item.id}`}>
                    <div className={`cards-container-img`}>
                      <img src={item.image} alt='contentImage' className='cards-img' />
                    </div>
                    <div className={`${item.state} card-state`}></div>
                    <h3 className='cards-title'>{item.title}</h3>
                    <h4 className='cards-date'>{item.date}</h4>
                    <p className='cards-user'>{item.user}</p>
                  </Link>
                </div>
              )
            }
          })
            : 'data missing'}
        </div>
      </main>
    </div>
  )
}

export default ArchiveCards