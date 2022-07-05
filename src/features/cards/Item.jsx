import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCards, selectCards, statusCards, errorCards, stateHandle} from './cardsSlice'
import Header from '../../components/Header'
import './Item.css'

const Item = () => {
    const dispatch = useDispatch()

    const list = useSelector(selectCards)
    const listStatus = useSelector(statusCards)
    const listError = useSelector(errorCards)

    const {item} = useParams();
    const data = Object.entries({item}).shift().pop() //obtengo id crudo

    const array = Object.entries(list); //obtengo arrays

    const date = array.map(item=>{
        if(item[1].id === data){
        const date = Object.entries(item[1].date)
        const dateSec = Object.entries(date[0])
        const dateNano = Object.entries(date[1])
        
        const sec = dateSec[1].pop()
        const nano = dateNano[1].pop()

        const newDate = new Date (sec*1000 + nano/1000000)
        const fecha = newDate.toLocaleDateString()
        return fecha;
        } 
    })
    const deadline = date.pop();
    const dateInfo = ()=>{
        if(deadline != null){
            return deadline.split('/');
        }
    }

    const getDate = ()=>{
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth()
        const day = today.getDate()

        if(year > dateInfo[2]){ return console.log('overdueY')}
        else if(month > dateInfo[1]){return console.log('overdueM')}
        else if (day > dateInfo[0]){return console.log('asd')}
        
    }
    
    useEffect(()=>{
        dispatch(fetchCards());
        getDate();
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
                        <p className='item-text' >{deadline}</p>
                        
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