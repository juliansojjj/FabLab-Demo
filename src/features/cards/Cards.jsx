import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCards, selectCards, statusCards, errorCards} from './cardsSlice'
import './Cards.css'
import { Link } from 'react-router-dom'

const Cards = () => {
    const dispatch = useDispatch()
    const list = useSelector(selectCards)
    const listStatus = useSelector(statusCards)
    const listError = useSelector(errorCards)

    useEffect(()=>{
        dispatch(fetchCards())
    },[dispatch])

  return (
    <div>
        <div className='cards-container'>
            {listStatus == 'pending' ? <h2>Loading...</h2> : ''}
            {list.map(item=>{return(
                <Link to={`/card/${item.id}`} key={item.id} className='cards-item'>
                    <div className={`cards-container-img ${item.state}`}> <img src={item.image} className='cards-img' /></div>
                    <h3 className='cards-title'>{item.title}</h3>
                    <p className='cards-text'>{item.description}</p>
                </Link>
            )})
            }
        </div>
    </div>
  )
}

export default Cards