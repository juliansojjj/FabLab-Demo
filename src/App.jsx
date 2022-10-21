import React from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import './App.css'
import Home from './components/pages/Home'
import Archive from './components/pages/Archive'
import Profile from './components/pages/Profile';
import Item from './components/cards/Item';
import SearchCards from './components/cards/SearchCards';
import NotFound from './components/pages/NotFound';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Verification from './components/pages/Verification';
import Table from './components/pages/Table';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
              <Route path='login' element={<Login/>}/>
              <Route path='signup' element={<Signup/>}/>
              <Route path='*' element={<NotFound/>} />

              <Route element={<Verification/>} >
                  <Route path='/' element={<Home/>} />
                  <Route path='profile' element={<Profile/>}/>
                  <Route path='archive' element={<Archive/>} />
                  <Route path='table' element={<Table/>} />
                  <Route path='card/:item' element={<Item/>} />
                  <Route path='card/search/:input' element={<SearchCards/>} />
              </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App