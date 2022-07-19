import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import Header from '../../components/Header'
import './Item.css'
import { useGetCardMutation, useUpdateToCompleteMutation, useUpdateToIncompleteMutation } from '../../app/cardsApi'
import Alert from "../../icons/triangle-alert.svg"

const Item = () => {
    const [getCard,{data, error, isLoading, isError}] = useGetCardMutation()
    const [updateToComplete] = useUpdateToCompleteMutation()
    const [updateToIncomplete] = useUpdateToIncompleteMutation()
    const params = useParams()
    const dispatch = useDispatch
    const [advice, setAdvice] = useState(true)
    const [alert,setAlert] = useState('')
    
    const getDate = ()=>{
        if (data){
            const date = data.date
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
    }

    const stateToComplete = async (e)=>{
        e.preventDefault()
        const {item} = params;
        const string = Object.entries({item}).shift().pop()
        updateToComplete(string)
        setAlert('show')
    }
    const stateToIncomplete = async (e)=>{
        e.preventDefault()
        const {item} = params;
        const string = Object.entries({item}).shift().pop()
        updateToIncomplete(string)
        setAlert('show')
    }

    useEffect(()=>{
        const {item} = params;
        const string = Object.entries({item}).shift().pop()
        getCard(string)
    },[])

 return (
    <div className='base'>
        <Header/>
        {isError ? error : ''}
        {isLoading ? <h2>Loading...</h2> : data ? data.map(item=>{
            return(
                <main key={item.id} className='item-container' >
                    <div className='item-img-container item-container--child'>
                        <img src={item.image} className='item-img' />
                    </div>
                    <div className='item-data item-container--child'>
                        <h2 className='item-title'>{item.title}</h2>
                        <hr />
                        <h3 className='item-subtitle'>Estado</h3>
                        <div className='item-state'>
                            <h4 className={`item-${item.state} item-state--child`}>
                            {item.state == 'complete' ? 'Completo' : ''}
                            {item.state == 'incomplete' ? 'Incompleto' : ''}
                            </h4>                    
                            {item.state == 'complete' ? <button onClick={stateToIncomplete} className={`${item.state}-button item-state--child`}>Marcar como incompleto</button> : ''}
                            {item.state == 'incomplete' ? <button onClick={stateToComplete} className={`${item.state}-button item-state--child`}>Marcar como completo</button> : ''}
                        </div>
                        {alert == 'show' ? 
                                <div className={`item-state--alert`}>
                                    <img src={Alert} className='img-min' />
                                    <span className='alert-msg'>Refresque la página para ver los cambios</span>
                                    <span className='alert-btn' onClick={(e)=>{setAlert('hidden')}}>X</span>
                                </div> 
                            :''} 
                        
                        <h3 className='item-subtitle'>Fecha límite</h3>
                        <p className='item-text' >{item.date}</p>
                        
                        <h3 className='item-subtitle'>Alumno</h3>
                        <p className='item-text'>{item.user}</p>
                        
                        <h3 className='item-subtitle'>Año</h3>
                        <p className='item-text'>{item.userY}</p>
                        <hr />

                        <div className='item-info'>
                            <h3 className='item-subtitle'>Información</h3>
                            <h4 className='item-subtitle'>Medidas</h4>
                            <p className='item-text'>40 x 50</p>
                            <h4 className='item-subtitle'>Descripción</h4>
                            <p className='item-text'>{item.description}</p>
                        </div>
                    </div>
                </main>)}
            )
        : 'missing data'}
    </div>
  )
}

export default Item