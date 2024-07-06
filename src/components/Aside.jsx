import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { filtersAndOrder, selectCardsOrder, selectCardsShow } from '../features/content/contentSlice'
import ArrowDown from '../icons/arrow-down.svg'
import './Aside.css'
import PropTypes from 'prop-types';

const Aside = ({responsive}) => {
  const dispatch = useDispatch()
  const show = useSelector(selectCardsShow)
 const order = useSelector(selectCardsOrder)
  
  const [showComplete,setShowComplete] = useState(false)
  const [showIncomplete,setShowIncomplete] = useState(false)

  const [menuOpen,setMenuOpen] = useState(false)

  const showManage = (e)=>{
    if(e.target.name === 'completeSelect'){
      if(!showComplete){
        setShowComplete(true)
        dispatch(filtersAndOrder({show:'complete'}))
      }if(showComplete){
        setShowComplete(false)
        dispatch(filtersAndOrder({show:'all'}))
      }if(show === 'incomplete'){
        setShowIncomplete(false)
        setShowComplete(true)
        dispatch(filtersAndOrder({show:'complete'}))
      }
    }

    if(e.target.name === 'incompleteSelect'){
      if(!showIncomplete){
        setShowIncomplete(true)
        dispatch(filtersAndOrder({show:'incomplete'}))
      }
      if(showIncomplete){
        setShowIncomplete(false)
        dispatch(filtersAndOrder({show:'all'}))
      }
      if(show === 'complete'){
        setShowComplete(false)
        setShowIncomplete(true)
        dispatch(filtersAndOrder({show:'incomplete'}))
      }
    }
  }

  const OrderMenuManage = ()=>{
    if(!menuOpen){
      setMenuOpen(true)}
    else {
      setMenuOpen(false)}
  }

  const orderManage = (e)=>{
    const name = e.target.attributes.getNamedItem("name").value;
    if (name === 'recentOption'){
      if(order === 'recent'){
        setMenuOpen(false)
      }
      else{
        setMenuOpen(false)
        dispatch(filtersAndOrder({order:'recent'}))
      }
    }

    if(name === 'oldOption'){
      if(order === 'old'){
        setMenuOpen(false)
      }
      else {
        setMenuOpen(false)
        dispatch(filtersAndOrder({order:'old'}))
      }
    }
  }

  return (
    <aside className={`${responsive && 'responsive'} dashboard`}>
      {responsive && <Link to='/' className='dashboard-home--link'>Ir a la home</Link>}
      <h2 className='dashboard-title' id='main-title'>Filtros</h2>

      <div className='dashboard-states'>
        <h3 className='dashboard-title'>Estado</h3>
        <div className='state-check'>
          <h4 className='dashboard-subtitle'>Terminado</h4>
          <input type="checkbox" onChange={showManage} name='completeSelect' checked={showComplete} />
        </div>
        <div className='state-check'>
          <h4 className='dashboard-subtitle'>En proceso</h4>
          <input type="checkbox" onChange={showManage} name='incompleteSelect' checked={showIncomplete}/>
        </div>
      </div>

      <div className='dashboard-order'>
        <h3 className='dashboard-title'>Orden de subida</h3>
        <div onClick={OrderMenuManage} className='dashboard-order-select'>
          <span>{order === 'recent' ? 'Más reciente' : 'Más antiguo'}</span>
          <img src={ArrowDown} alt='arrowDownLogo'/>
        </div>
        {menuOpen 
          ? <div className='dashboard-order--options'>
              <span className='options-child' onClick={orderManage} name='recentOption'>Más reciente</span>
              <span className='options-child' onClick={orderManage} name='oldOption'>Más antiguo</span>
            </div> 
          : ''}
      </div>

      <div className='dashboard-links'>
        <h3 className='dashboard-title dashboard-links-title'>Características</h3>
        <Link to='/archive' className='navigate dashboard-links--child'>Archivados</Link>
        <Link to='/table' className='navigate dashboard-links--child'>List view</Link>
      </div>
    </aside>
  )
}

Aside.propTypes = {
  responsive: PropTypes.bool, 
};

export default Aside