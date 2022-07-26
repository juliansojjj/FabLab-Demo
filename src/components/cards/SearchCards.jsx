import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetSearchQuery } from '../../app/cardsApi'
import Header from '../Header'
import { Link } from 'react-router-dom'
import Menu from '../../icons/menu.svg'

const SearchCards = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data, isLoading} = useGetSearchQuery();
    const [loading,setLoading] = useState(true)

  return (
    <div>
        <Header/>
        <div className='base'>
          {data != 'empty' ? <h2>Resultados</h2> : ''}
          {data == 'empty' ? <h2>No hay resultados para "{sessionStorage.getItem('input')}"</h2>
              : <div className='cards-container'>
                    {data?.map(item=>{
                        return(
                            <div key={item.id} className='cards-item'>
                              <div className='item-menu'>
                                <div className='menu-click'><img src={Menu} id={`item-click-${item.id}`}/></div>
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
                        )
                    })}
                </div>}
        </div>
    </div>
  )
}

export default SearchCards