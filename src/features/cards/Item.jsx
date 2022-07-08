import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCards, selectCards, statusCards, errorCards, handleComplete, handleIncomplete, mainState} from './cardsSlice'
import Header from '../../components/Header'
import './Item.css'

const Item = () => {
    const dispatch = useDispatch()

    const list = useSelector(selectCards)
    const listStatus = useSelector(statusCards)
    const listError = useSelector(errorCards)
    const dataState = useSelector(mainState)

    const [advice, setAdvice] = useState('')
    const {item} = useParams();
    const data = Object.entries({item}).shift().pop() //obtengo id crudo
    const array = Object.entries(list); //obtengo arrays (todas las cards)
    //console.log(array)

    const idArray = array.map (item=>{
        if(item[1].id === data){
            const date = item[1].date
            return [date]
        }
    })
    //console.log(idArray)
    //console.log(itemDate)
/*
    const getDate = ()=>{
        if (itemDate != null){
            const date = itemDate.date
            const fecha = date.split('/')
            console.log(fecha)
        
            const today = new Date()
            const year = today.getFullYear()
            const month = today.getMonth()
            const day = today.getDate()

            if(year > fecha[2]){return console.log('Trabajo atrasado')}
            else if(month > fecha[1]){return console.log('Trabajo atrasado')}
            else if (day > fecha[0]){return console.log('Trabajo atrasado')}
            }
    }*/

    const stateToComplete = async (e)=>{
        e.preventDefault()
        dispatch(handleComplete({id:data}))
        setAdvice('Recargue la página para ver los cambios')
    }
    const stateToIncomplete = async (e)=>{
        e.preventDefault()
        dispatch(handleIncomplete({id:data}))
        setAdvice('Recargue la página para ver los cambios')
    }
    
    useEffect(()=>{
        dispatch(fetchCards())
    },[dispatch])

 return (
    <div className='base'>
        <Header/>
        {listStatus == 'pending' ? <h2>Loading...</h2> : ''}
        {array.map(item=>{
            if(item[1].id === data){
                return(
                <main key={item[1].id} className='item-container' >
                    <div className='item-img-container item-container--child'>
                        <img src={item[1].image} className='item-img' />
                    </div>
                    <div className='item-data item-container--child'>
                        <h2 className='item-title'>{item[1].title}</h2>
                        <hr />
                        <h3 className='item-subtitle'>Estado</h3>
                        <div className='item-state'>
                            <h4 className={`item-${item[1].state} item-state--child`}>
                            {item[1].state == 'complete' ? 'Completo' : ''}
                            {item[1].state == 'incomplete' ? 'Incompleto' : ''}
                            </h4>
                            {advice}
                            {item[1].state == 'complete' ? <button onClick={stateToIncomplete} className={`${item[1].state}-button item-state--child`}>Marcar como incompleto</button> : ''}
                            {item[1].state == 'incomplete' ? <button onClick={stateToComplete} className={`${item[1].state}-button item-state--child`}>Marcar como completo</button> : ''}
                        </div>
                        
                        <h3 className='item-subtitle'>Fecha límite</h3>
                        <p className='item-text' >{item[1].date}</p>
                        
                        <h3 className='item-subtitle'>Alumno</h3>
                        <p className='item-text'>{item[1].user}</p>
                        
                        <h3 className='item-subtitle'>Año</h3>
                        <p className='item-text'>{item[1].userY}</p>
                        <hr />

                        <div className='item-info'>
                            <h3 className='item-subtitle'>Información</h3>
                            <h4 className='item-subtitle'>Medidas</h4>
                            <p className='item-text'>40 x 50</p>
                            <h4 className='item-subtitle'>Descripción</h4>
                            <p className='item-text'>{item[1].description}</p>
                        </div>
                    </div>
                </main>)}})}
            </div>
  )
}

export default Item