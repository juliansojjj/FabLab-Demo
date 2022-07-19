import React, { useEffect, useState } from 'react'
import {useGetDocsQuery} from '../../app/cardsApi'
import './Cards.css'
import { Link } from 'react-router-dom'
import Menu from '../../icons/menu.svg'
import { useUnArchiveCardMutation, useDeleteCardMutation } from '../../app/cardsApi'

const ArchiveCards = () => {
    const { data, error, isLoading, isSuccess, isError } = useGetDocsQuery();
    const [selectMenu,setSelectMenu] = useState(null)
    const [menuOpen,setMenuOpen] = useState(false)
    const [unArchiveCard] = useUnArchiveCardMutation()
    const [deleteCard] = useDeleteCardMutation()
    const [eliminateOption,setEliminateOption] = useState('')

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

    const notArchiveCard = async(e)=>{
      e.preventDefault()
      const id = e.target.attributes.getNamedItem("cardid").value;
      unArchiveCard(id)
    }

    const eliminateCard = (e)=>{
        const id = e.target.attributes.getNamedItem("cardid").value;
        deleteCard(id)
        setEliminateOption('')
    } 

  return (
    <div>
        <h1>Cards Archivadas</h1>
        {eliminateOption ? <div className='eliminate-container'>
                    <div className='eliminate-alert'>
                        <h2>Eliminar Card</h2>
                        <p>La card se eliminará de manera <b>definitiva</b> ¿Está seguro que desea deletearla?</p>
                        <button className='eliminate-confirm' onClick={eliminateCard} cardid={eliminateOption}>Eliminar</button>
                        <button className='eliminate-cancel' onClick={(e)=>{setEliminateOption(false)}}>Cancelar</button>
                    </div>
                    <div className='eliminate-background'></div>
                </div> : ''}
        <div className='cards-container'>
        {isError && error.message}
        {isLoading && "Loading..."}
        {data ? data.map(item=>{
          if(item.archive == 'true'){ return(
                <div key={item.id} className='cards-item'>
                  <div className='item-menu'>
                    <div className='menu-click'><img src={Menu} id={`item-click-${item.id}`} onClick={cardMenu}/></div>
                    {menuOpen ?
                      selectMenu === `item-click-${item.id}` ? 
                        <div className='archive-menu'>
                            <div className='archive-menu--option' archive={item.archive} onClick={notArchiveCard} cardid={item.id}>Desarchivar</div>
                            <div className='archive-menu--option' onClick={(e)=>{setEliminateOption(item.id)}}>Eliminar</div>
                            </div> : ''
                    : ''}
                  </div>
                  <Link to={`/card/${item.id}`}>
                    <div className={`cards-container-img`}>                      
                      <img src={item.image} className='cards-img' />
                    </div>
                    <div className={`${item.state} card-state`}></div>
                    <h3 className='cards-title'>{item.title}</h3>
                    <h4 className='cards-date'>{item.date}</h4>
                    <p className='cards-text'>{item.description}</p>
                  </Link>
                </div>
            )}
          })
        :'data missing'}
        </div>
    </div>
  )
}

export default ArchiveCards