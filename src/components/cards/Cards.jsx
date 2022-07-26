import React, { useEffect, useState } from 'react'
import {useGetDocsQuery, useSetOldMutation, useToArchiveCardMutation} from '../../app/cardsApi'
import './Cards.css'
import { Link } from 'react-router-dom'
import Menu from '../../icons/menu.svg'

const Cards = () => {
    const { data, error, isError } = useGetDocsQuery();
    const [setOld] = useSetOldMutation()
    const [selectMenu,setSelectMenu] = useState(null)
    const [menuOpen,setMenuOpen] = useState(false)
    const [toArchiveCard] = useToArchiveCardMutation()

    const cardMenu = (e)=>{
      e.stopPropagation()
      if(!menuOpen){
        setMenuOpen(true)
        const id = e.target.attributes.getNamedItem("id").value;
        if (!selectMenu){ setSelectMenu(id)}
      }
      else{
        setMenuOpen(false)
        if(selectMenu){setSelectMenu(null)}
      }
    }

    document.onclick = ()=>{
      if(menuOpen){
        setMenuOpen(false)
        setSelectMenu(null)
      }
    }

    const archiveCard = async(e)=>{
      e.preventDefault()
      const state = e.target.attributes.getNamedItem("archive").value;
      const id = e.target.attributes.getNamedItem("cardid").value;
      toArchiveCard(id)
    }

    const setNewFalse = (e)=>{
      const id = e.target.attributes.getNamedItem("cardid").value;
      const notNew = e.target.attributes.getNamedItem("new").value;
      if(notNew == 'true'){
        setOld(id)
      }
    }

  return (
    <div>
        <div className='cards-container'>
        {isError && error.message}
        {data ? data.map((item)=>{
          if(item.archive !== 'true'){ 
            return(
                <div key={item.id} className={item.new == 'true' ? `new-card cards-item` : `cards-item`}>
                  <div className='item-menu'>
                    <div className='menu-click'><img src={Menu} id={`item-click-${item.id}`} onClick={cardMenu}/></div>
                    {menuOpen ?
                      selectMenu === `item-click-${item.id}` ? <div className='menu-option' archive={item.archive} onClick={archiveCard} cardid={item.id}>Archivar</div> : ''
                    : ''}
                  </div>
                  <Link to={`/card/${item.id}`} cardid={item.id} new={item.new} onClick={setNewFalse}>
                    <div className={`cards-container-img`}>                      
                      <img src={item.image} className='cards-img' />
                    </div>
                    <div className={`${item.state} card-state`}></div>
                    <h3 className='cards-title'>{item.title}</h3>
                    <h4 className='cards-date'>{item.date}</h4>
                    <p className='cards-text'>{item.description}</p>
                  </Link>
                </div>
            )
          }
          }) : <h2>Loading...</h2>}
        </div>
    </div>
  )
}

export default Cards