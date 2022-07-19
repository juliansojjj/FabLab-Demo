import React from 'react'
import Header from '../Header'
import ArchiveCards from '../../features/cards/ArchiveCards'

const Archive = () => {
  return (
    <div>
        <Header/>
        <main className='base'>
            <ArchiveCards/>
        </main>
    </div>
  )
}

export default Archive