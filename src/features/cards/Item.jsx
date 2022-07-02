import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCards, selectCards, statusCards, errorCards} from './cardsSlice'
import Header from '../../components/Header'
import './Item.css'

const Item = () => {
    const dispatch = useDispatch()
    const [info, setInfo] = useState([])
    const [element, setElement] = useState([])

    const list = useSelector(selectCards)
    const listStatus = useSelector(statusCards)
    const listError = useSelector(errorCards)

    const {item} = useParams();
    const data = Object.entries({item}).shift().pop() //obtengo id crudo

    const array = Object.entries(list) //obtengo arrays

    useEffect(()=>{
        dispatch(fetchCards())
    },[dispatch])

 return (
    <div className='base'>
        <Header/>
        {array.map(item=>{
            if(item[1].id === data){
            return (
                <main key={item[1].id} className='item-container' >
                    <div className='item-img-container'>
                        <img src={item[1].image} className='item-img' />
                    </div>
                    <div className='item-data'>
                        <h1 className='item-title'>{item[1].title}</h1>
                        <hr />
                        <h2 className='item-subtitle'>Estado</h2>
                        <h3 className={`item-${item[1].state}`}>
                            {item[1].state == 'complete' ? 'Completo' : ''}
                            {item[1].state == 'incomplete' ? 'Incompleto' : ''}
                            {item[1].state == 'overdue' ? 'Atrasado' : ''}
                            </h3>
                        
                        <h2 className='item-subtitle'>Fecha límite</h2>
                        <p className='item-text' >x/x/x</p>
                        
                        <h2>Alumno</h2>
                        <p className='item-text'>{item[1].user}</p>
                        
                        <h2 className='item-subtitle'>Año</h2>
                        <p className='item-text'>{item[1].userY}</p>
                        
                        <div className='item-info'>
                            <h2 className='item-subtitle'>Información</h2>
                            <h3 className='item-subtitle'>Medidas</h3>
                            <p className='item-text'>40 x 50</p>
                            <h3 className='item-subtitle'>Descripción</h3>
                            <p className='item-text'>{item[1].description}</p>
                        </div>
                    </div>
                </main>)}
        })}
        
    </div>
  )
}

export default Item