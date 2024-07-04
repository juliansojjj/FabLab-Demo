import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Item from './components/cards/Item';
import Archive from './components/pages/Archive';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Profile from './components/pages/Profile';
import Signup from './components/pages/Signup';
import Table from './components/pages/Table';
import Verification from './components/pages/Verification';

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
              </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App