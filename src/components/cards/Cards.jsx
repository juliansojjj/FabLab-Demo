import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cardModification, selectAdmin, selectCards, selectCardsOrder, selectCardsShow } from '../../features/content/contentSlice'
import Menu from '../../icons/menu.svg'
import './Cards.css'

const Cards = () => {
  const data = useSelector(selectCards)
  const adminLogged = useSelector(selectAdmin)
  const show = useSelector(selectCardsShow)
  const order = useSelector(selectCardsOrder)

  const dispatch = useDispatch()
  const [selectMenu, setSelectMenu] = useState(null)
  const [alert, setAlert] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  let arrayData = []

  if (data) {
    arrayData=[...data]
    if(show !== 'all') {arrayData = arrayData.filter(item=>item.state === show);}
    
    if (order === 'recent')  arrayData.sort((a, b) => b.serialNum - a.serialNum)
    else if(order === 'old') arrayData.sort((a, b) => a.serialNum - b.serialNum)
    
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
    const cardId = e.currentTarget.attributes.getNamedItem("data-cardid").value;
    dispatch(cardModification({operation:'archive',cardId:cardId,value:'true'}));  
  }

  return (
    <div>
      <div className='cards-container'>
        {data &&
            arrayData.map(item => {
              if (item.archive !== 'true') {
                return (
                  <div key={item.id} className={adminLogged.viewed.find(pos=>pos===item.id) ? `cards-item`: `new-card cards-item`}>
                    <div className='item-menu'>
                      <div className='menu-click'><img src={Menu} id={`item-click-${item.id}`} onClick={cardMenu} /></div>
                      {menuOpen &&
                        selectMenu === `item-click-${item.id}` && 
                          <div className='menu-option' archive={item.archive} onClick={archiveCard} data-cardid={item.id}>Archivar</div>
                      }
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
          }

      </div>
    </div>
  )
}

export default Cards