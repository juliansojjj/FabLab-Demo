import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './components/pages/Home'
import Archive from './components/pages/Archive'
import Profile from './components/pages/Profile';
import Item from './features/cards/Item';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/archive' element={<Archive/>} />
            <Route path='/card/:item' element={<Item/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App