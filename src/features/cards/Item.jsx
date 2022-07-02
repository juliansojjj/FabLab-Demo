import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCards, selectCards, statusCards, errorCards} from './cardsSlice'
import { connectFirestoreEmulator } from 'firebase/firestore'

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
    <div>
        {array.map(item=>{
            if(item[1].id === data){
            return (
                <main>
                    <h1>{item[1].title}</h1>
                    <img src={item[1].image} />
                    <p>{item[1].description}</p>
                </main>)}
        })}
        
    </div>
  )
}

export default Item