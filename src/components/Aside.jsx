import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Aside.css'
import { useDispatch, useSelector } from 'react-redux'
import { setShow, setOrder, showFilter, orderFilter} from '../features/filters/filtersSlice'
import ArrowDown from '../icons/arrow-down.svg'

const Aside = () => {
  const dispatch = useDispatch()
  const show = useSelector(showFilter)
  const order = useSelector(orderFilter)
  
  const [showComplete,setShowComplete] = useState(false)
  const [showIncomplete,setShowIncomplete] = useState(false)

  const [menuOpen,setMenuOpen] = useState(false)
  const [menuOpenVerif,setMenuOpenVerif] = useState(false)

  const showManage = (e)=>{
    if(e.target.name == 'completeSelect'){
      if(!showComplete){
        setShowComplete(true)
        dispatch(setShow('complete'))}
      if(showComplete){
        setShowComplete(false)
        dispatch(setShow(''))}
      if(show == 'incomplete'){
        setShowIncomplete(false)
        setShowComplete(true)
        dispatch(setShow('complete'))
      }
    }

    if(e.target.name == 'incompleteSelect'){
      if(!showIncomplete){
        setShowIncomplete(true)
        dispatch(setShow('incomplete'))}
      if(showIncomplete){
        setShowIncomplete(false)
        dispatch(setShow(''))}
      if(show == 'complete'){
        setShowComplete(false)
        setShowIncomplete(true)
        dispatch(setShow('incomplete'))
      }
    }
  }

  const OrderMenuManage = (e)=>{
    if(!menuOpen){
      setMenuOpen(true)
      setMenuOpenVerif(true)}
    else {
      setMenuOpen(false)
      setMenuOpenVerif(false)}
  }

  const orderManage = (e)=>{
    const name = e.target.attributes.getNamedItem("name").value;
    if (name == 'recentOption'){
      if(order == 'recent'){
        setMenuOpen(false)
      }
      else{
        setMenuOpen(false)
        dispatch(setOrder('recent'))
      }
    }

    if(name == 'oldOption'){
      if(order == 'old'){
        setMenuOpen(false)
      }
      else {
        setMenuOpen(false)
        dispatch(setOrder('old'))
      }
    }
  }

  /*document.onclick = ()=>{
    if(menuOpen){setMenuOpen(false)}
    if(!menuOpen && menuOpenVerif){setMenuOpenVerif(false)}
  }*/

  return (
    <aside className='dashboard'>
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
        <h3 className='dashboard-title'>Orden</h3>
        <div onClick={OrderMenuManage} className='dashboard-order-select'>
          <span>{order == 'recent' ? 'Más reciente' : 'Más antiguo'}</span>
          <img src={ArrowDown}/>
        </div>
        {menuOpen 
          ? <div className='dashboard-order--options'>
              <span className='options-child' onClick={orderManage} name='recentOption'>Más reciente</span>
              <span className='options-child' onClick={orderManage} name='oldOption'>Más antiguo</span>
            </div> 
          : ''}
      </div>

      <div>
        <h3 className='dashboard-title'>Características</h3>
        <Link to='/archive' className='navigate'>Archivados</Link>
      </div>
    </aside>
  )
}

export default Aside