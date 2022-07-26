import React from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Cards from '../cards/Cards'

const Home = () => {
  return (
    <div>
      <Header/>
        <div className='base-dashboard'>
          <Aside/>
          <Cards/>
      </div>
    </div>
  )
}

export default Home