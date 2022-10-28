import React from 'react'
import Header from '../Header'
import ArchiveCards from '../cards/ArchiveCards'

const Archive = () => {
  return (
    <div className='base'>
        <Header/>
        <main>
            <ArchiveCards/>
        </main>
    </div>
  )
}

export default Archive