import React, { useEffect, useState } from 'react'
import {useGetDocsQuery} from '../../app/cardsApi'
import './Cards.css'
import { Link } from 'react-router-dom'

const Cards = () => {
    const { data, error, isLoading, isSuccess, isError } = useGetDocsQuery();

  return (
    <div>
        <div className='cards-container'>
        {isError && error.message}
        {isLoading && "Loading..."}
        {data ? data.map(item=>{return(
                <Link to={`/card/${item.id}`} key={item.id} className='cards-item'>
                    <div className={`cards-container-img`}> <img src={item.image} className='cards-img' /></div>
                    <div className={`${item.state} card-state`}></div>
                    <h3 className='cards-title'>{item.title}</h3>
                    <p className='cards-text'>{item.description}</p>
                </Link>
            )})
        :'data missing'}
        </div>
    </div>
  )
}

export default Cards