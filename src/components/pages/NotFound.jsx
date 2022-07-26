import React from 'react'
import Header from '../Header'

const NotFound = () => {
  return (
    <div>
        <Header/>
        <div className='base'>
            <h1>Página no encontrada</h1>
            <h3>Asegúrese de escribir correctamente la dirección url</h3>
        </div>
    </div>
  )
}

export default NotFound