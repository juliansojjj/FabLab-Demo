import React from 'react'
import { Link } from 'react-router-dom'
import './Aside.css'

const Aside = () => {
  return (
    <aside className='dashboard'>
      <h2 className='dashboard-title' id='main-title'>Filtros</h2>

      <div className='dashboard-states'>
        <h3 className='dashboard-title'>Estado</h3>
        <div className='state-check'>
          <h4 className='dashboard-subtitle'>Terminado</h4>
          <input type="checkbox" />
        </div>
        <div className='state-check'>
          <h4 className='dashboard-subtitle'>En proceso</h4>
          <input type="checkbox" />
        </div>
      </div>

      <div className='dashboard-date'>
        <h3 className='dashboard-title'>Dead-line</h3>
        <button className='dashboard-button'>Día</button>
        <button className='dashboard-button'>Sem</button>
        <button className='dashboard-button'>Mes</button>
        <input type="date" />
      </div>

      <div>
        <h3 className='dashboard-title'>Características</h3>
        <Link reloadDocument to='/archive' className='navigate'>Archivados</Link>
      </div>
    </aside>
  )
}

export default Aside