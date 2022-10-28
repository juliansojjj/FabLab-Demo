import React, { useEffect, useState } from 'react'
import { useGetDocsQuery} from '../../app/cardsApi'
import './Cards.css'
import { Link } from 'react-router-dom'
import Menu from '../../icons/menu.svg'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { showFilter, orderFilter } from '../../features/filters/filtersSlice'
import Alert from "../../icons/triangle-alert-empty.svg"
import Xmark from "../../icons/xmark-solid.svg"

const Cards = () => {
  const { data, error, isError } = useGetDocsQuery();
  const [selectMenu, setSelectMenu] = useState(null)
  const [alert, setAlert] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const show = useSelector(showFilter)
  const order = useSelector(orderFilter)
  let arrayData = []

  if (data) {
    arrayData = [...data];
    if (order == 'recent') {
      arrayData.sort((a, b) => a.serialNum - b.serialNum)
    }
    if (order == 'old') {
      arrayData.sort((a, b) => b.serialNum - a.serialNum)
    }
  }

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

  const alertManage = (msg) => {
    if (alert) setAlert(false);
    else if (!alert) {
      setAlert(msg);
      setTimeout(() => { setAlert(false) }, 4000)
    }
  }

  const archiveCard = async (e) => {
    e.preventDefault()
    const state = e.target.attributes.getNamedItem("archive").value;
    const id = e.target.attributes.getNamedItem("data-cardid").value;
    try {
      const docRef = doc(db, 'card', id)
      const data = { archive: 'true' }
      updateDoc(docRef, data).then(()=>{alertManage('Refresque la página para ver los cambios')})
        .catch((err) => { console.log(err.message) })
    } catch (err) {
      return { error: err }
    }
  }

  return (
    <div>
      {alert ?
          <div className='cards-alert'>
            <img src={Alert} className='cards-alert-sign' />
            <span className='cards-alert-msg'>Refresque la página para ver los cambios</span>
            <img className='cards-alert-btn' onClick={alertManage} src={Xmark} />
          </div>
          : ''}
      <div className='cards-container'>
        {isError && error.message}
        {data
          ? show !== ''
            ? arrayData.filter(item => item.state == show).map(item => {
              if (item.archive !== 'true') {
                return (
                  <div key={item.id} className={item.new == 'true' ? `new-card cards-item` : `cards-item`}>
                    <div className='item-menu'>
                      <div className='menu-click'><img src={Menu} id={`item-click-${item.id}`} onClick={cardMenu} /></div>
                      {menuOpen ?
                        selectMenu === `item-click-${item.id}` ? <div className='menu-option' archive={item.archive} onClick={archiveCard} data-cardid={item.id}>Archivar</div> : ''
                        : ''}
                    </div>
                    <Link to={`/card/${item.id}`} data-cardid={item.id}>
                      <div className={`cards-container-img`}>
                        <img src={item.image} className='cards-img' />
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
            : arrayData.map(item => {
              if (item.archive !== 'true') {
                return (
                  <div key={item.id} className={item.new == 'true' ? `new-card cards-item` : `cards-item`}>
                    <div className='item-menu'>
                      <div className='menu-click'><img src={Menu} id={`item-click-${item.id}`} onClick={cardMenu} /></div>
                      {menuOpen ?
                        selectMenu === `item-click-${item.id}` ? <div className='menu-option' archive={item.archive} onClick={archiveCard} data-cardid={item.id}>Archivar</div> : ''
                        : ''}
                    </div>
                    <Link to={`/card/${item.id}`} data-cardid={item.id}>
                      <div className={`cards-container-img`}>
                        <img src={item.image} className='cards-img' />
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
          : <h2>Loading...</h2>}

      </div>
    </div>
  )
}

export default Cards