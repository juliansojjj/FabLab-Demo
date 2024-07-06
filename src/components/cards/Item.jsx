import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useParams } from 'react-router-dom'
import { cardModification, obsoleteViewed, selectAdmin, selectCards } from '../../features/content/contentSlice'
import ArrowDown from '../../icons/arrow-down.svg'
import Download from "../../icons/download-solid.svg"
import Folder from '../../icons/folder-filled.svg'
import Header from '../Header'
import './Item.css'

const Item = () => {
    
    const params = useParams()
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false)
    const adminLogged = useSelector(selectAdmin);
    const cards = useSelector(selectCards);


    const { item } = params;
    const string = Object.entries({ item }).shift().pop()
    const data = cards.filter(item=>item.id === string)[0];
    dispatch(obsoleteViewed({cardId:string,userId:adminLogged.id}));
 
    const cardHandle =  (e) => {
        e.preventDefault()
        const operation = e.currentTarget.attributes.getNamedItem("data-operation").value;
        const value = e.currentTarget.attributes.getNamedItem("data-value").value;
        dispatch(cardModification({operation:operation,cardId:string,value:value}));  
    }

    const printerHandle =  (e) => {
        e.preventDefault()
        const value = e.currentTarget.attributes.getNamedItem("data-value").value;
        dispatch(cardModification({operation:'printer',cardId:string,value:value}));  
        setMenu(false);
    }

    const setMenuOpen = () => {
        if (menu) setMenu(false)
        else setMenu(true)
    }

    return (
        <div className='base'>
            <Header />
            {data ? 
                    <main className='item-container' >
                        <div className='item-img-container item-container--child'>
                            <img src={data.image} alt='contentImage' className='item-img' />
                        </div>
                        <div className='item-data item-container--child'>
                            <h3 className='item-title'>{data.user} - {data.title}</h3>
                            <span className='item-subtitle'>Estado</span>
                            <div className='item-state'>
                                <h4 className={`item-${data.state} item-state--child`}>
                                    {data.state === 'complete' ? 'Completo' : 'Incompleto'}
                                </h4>
                                {data.state === 'complete' 
                                ? <button onClick={cardHandle} className={`${data.state}-button item-state--child`} data-operation="state" data-value="incomplete">Marcar como incompleto</button> 
                                : <button onClick={cardHandle} className={`${data.state}-button item-state--child`} data-operation="state" data-value="complete">Marcar como completo</button>}
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
                                <img alt='arrowDownLogo'src={ArrowDown} />
                            </div>
                            {menu &&
                                <div className='item-printer-options'>
                                    <span className='item-printer-option' onClick={printerHandle} data-value='Printer 1'>Printer 1</span>
                                    <span className='item-printer-option' onClick={printerHandle} data-value='Printer 2'>Printer 2</span>
                                    <span className='item-printer-option' onClick={printerHandle} data-value='Printer 3'>Printer 3</span>
                                </div>
                            }
                        </div>

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
                            <div className='item-file--buttons item-file--son'>
                                <a href={data.file} download className='item-file--download item-file--son'>
                                    <span>Descargar</span>
                                    <img alt='downloadLogo' src={Download} />
                                </a>
                                <button  className='item-file--archive item-file--son' data-operation="archive" onClick={cardHandle} data-value={data.archive === 'true' ? 'false': 'true'}>
                                    <span>{data.archive === 'true' ? 'Desarchivar' : 'Archivar'}</span>
                                    <img alt='folderLogo' src={Folder} />
                                </button>
                            </div>
                        </div>
                    </main>
                : 'missing data'}
        </div>
    )
}

export default Item;