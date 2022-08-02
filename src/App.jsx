import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './components/pages/Home'
import Archive from './components/pages/Archive'
import Profile from './components/pages/Profile';
import Item from './components/cards/Item';
import SearchCards from './components/cards/SearchCards';
import NotFound from './components/pages/NotFound';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/archive' element={<Archive/>} />
            <Route path='/card/:item' element={<Item/>} />
            <Route path='/card/search/:input' element={<SearchCards/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App