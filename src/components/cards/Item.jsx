import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import Header from '../Header'
import './Item.css'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useGetCardMutation } from '../../app/cardsApi'
import Alert from "../../icons/triangle-alert-empty.svg"
import Xmark from "../../icons/xmark-solid.svg"
import Download from "../../icons/download-solid.svg"
import ArrowDown from '../../icons/arrow-down.svg'

const Item = () => {
    const [getCard, { data, error, isLoading, isError }] = useGetCardMutation()
    const params = useParams()
    const dispatch = useDispatch
    const [advice, setAdvice] = useState(true)
    const [alert, setAlert] = useState(false)
    const [menu, setMenu] = useState(false)

    const getDate = () => {
        if (data) {
            const date = data.date
            const fecha = date.split('/')
            console.log(fecha)

            const today = new Date()
            const year = today.getFullYear()
            const month = today.getMonth()
            const day = today.getDate()

            if (year > fecha[2]) { return console.log('Trabajo atrasado') }
            else if (month > fecha[1]) { return console.log('Trabajo atrasado') }
            else if (day > fecha[0]) { return console.log('Trabajo atrasado') }
        }
    }

    const stateToComplete = async (e) => {
        e.preventDefault()
        const { item } = params;
        const id = Object.entries({ item }).shift().pop()
        try {
            const docRef = doc(db, 'card', id)
            const data = { state: 'complete' }
            updateDoc(docRef, data).then(console.log('Incomplete Now'))
                .catch((err) => { console.log(err.message) })
        } catch (err) {
            return { error: err }
        }
        alertManage()
    }
    const stateToIncomplete = async (e) => {
        e.preventDefault()
        const { item } = params;
        const id = Object.entries({ item }).shift().pop()
        try {
            const docRef = doc(db, 'card', id)
            const data = { state: 'incomplete' }
            updateDoc(docRef, data).then(console.log('Incomplete Now'))
                .catch((err) => { console.log(err.message) })
        } catch (err) {
            return { error: err }
        }
        alertManage()
    }

    const setMenuOpen = (e) => {
        if (menu) setMenu(false)
        else setMenu(true)
    }

    const alertManage = (e) => {
        if (alert) setAlert(false);
        else if (!alert) {
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 4000)
        }
    }

    const updatePrinterCard = async (e) => {
        const { item } = params;
        const string = Object.entries({ item }).shift().pop()
        const dataPrinter = e.target.getAttribute("data-printer");
        const docRef = doc(db, 'card', string)
        const data = { printer: dataPrinter }
        await updateDoc(docRef, data).then(() => console.log('Printer actualizada'))
        setMenu(false)
        alertManage()
    }

    const newOut = async (id) => {
        const docRef = doc(db, 'card', id)
        const data = { new: 'false' }
        await updateDoc(docRef, data).then(console.log('Card Old'))
        .catch((err) => { console.log(err.message) })
    }

    useEffect(() => {
        const { item } = params;
        const string = Object.entries({ item }).shift().pop()
        getCard(string)
        newOut(string)
    }, [])

    return (
        <div className='base'>
            <Header />
            {isError ? error : ''}
            {isLoading ? <h2>Loading...</h2> : data ? (
                    <main className='item-container' >
                        <div className='item-img-container item-container--child'>
                            <img src={data.image} className='item-img' />
                        </div>
                        <div className='item-data item-container--child'>
                            <h3 className='item-title'>{data.user} - {data.title}</h3>
                            <span className='item-subtitle'>Estado</span>
                            <div className='item-state'>
                                <h4 className={`item-${data.state} item-state--child`}>
                                    {data.state == 'complete' ? 'Completo' : ''}
                                    {data.state == 'incomplete' ? 'Incompleto' : ''}
                                </h4>
                                {data.state == 'complete' ? <button onClick={stateToIncomplete} className={`${data.state}-button item-state--child`}>Marcar como incompleto</button> : ''}
                                {data.state == 'incomplete' ? <button onClick={stateToComplete} className={`${data.state}-button item-state--child`}>Marcar como completo</button> : ''}
                            </div>

                            <span className='item-subtitle'>Fecha límite</span>
                            <span className='item-text' >{data.date}</span>

                            <span className='item-subtitle'>Alumno</span>
                            <span className='item-text'>{data.user}</span>

                            <span className='item-subtitle'>Año</span>
                            <span className='item-text'>{data.userY}</span>

                            <span className='item-subtitle'>Impresora</span>
                            <div className='item-text--printer' onClick={setMenuOpen} >
                                <span>{data.printer}</span>
                                <img src={ArrowDown} />
                            </div>
                            {menu
                                ? <div className='item-printer-options'>
                                    <span className='item-printer-option' onClick={updatePrinterCard} data-printer='Printer 1'>Printer 1</span>
                                    <span className='item-printer-option' onClick={updatePrinterCard} data-printer='Printer 2'>Printer 2</span>
                                    <span className='item-printer-option' onClick={updatePrinterCard} data-printer='Printer 3'>Printer 3</span>
                                </div>
                                : ''}
                        </div>
                        {alert ?
                            <div className='item-alert'>
                                <img src={Alert} className='item-alert-sign' />
                                <span className='item-alert-msg'>Refresque la página para ver los cambios</span>
                                <img className='item-alert-btn' onClick={alertManage} src={Xmark} />
                            </div>
                            : ''}

                        <div className='item-file'>
                            <div className='item-file--info item-file--son'>
                                <h3>Información</h3>
                                <span className='item-subtitle'>Medidas</span>
                                <p className='item-text'>{data.measures}</p>
                                <span className='item-subtitle'>Relleno</span>
                                <p className='item-text'>{data.filling}</p>
                                <span className='item-subtitle'>Descripción</span>
                                <p className='item-text'>{data.description}</p>
                            </div>
                            <a href={data.file} download className='item-file--download item-file--son'>
                                <span>Descargar</span>
                                <img src={Download} />
                            </a>
                        </div>
                    </main>)
                : 'missing data'}
        </div>
    )
}

export default Item