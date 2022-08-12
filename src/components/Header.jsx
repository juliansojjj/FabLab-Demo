import React from 'react';
import { Link } from 'react-router-dom';
import Fablab from '../icons/logo.svg'
import userIcon from '../icons/user-gear-solid.svg'
import './Header.css'
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header>
        <Link to='/'><img src={Fablab} className='img-min' replace /></Link>
        <SearchBar/>
        <Link to="/profile"><img src={userIcon} className='img-min' replace /></Link>
    </header>
  )
}

export default Header