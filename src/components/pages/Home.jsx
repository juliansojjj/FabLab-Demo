import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Aside from '../Aside'
import Cards from '../../features/cards/Cards'

const Home = () => {
  return (
    <div>
      <Header/>
        <div className='base'>
          <Aside/>
          <main>
            <Cards/>
          </main>
      </div>
      <Footer/>
    </div>
  )
}

export default Home