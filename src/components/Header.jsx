import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Fablab from '../icons/logo.svg'
import userIcon from '../icons/user-solid.svg'
import './Header.css'
import SearchBar from './SearchBar';

const Logo = styled.img`
  width: 1.8em;
`;

const Header = () => {
  return (
    <header>
        <Link reloadDocument to='/'><Logo src={Fablab} /></Link>
        <SearchBar/>
        <Link to="/profile"><img src={userIcon} className='img-min' /></Link>
    </header>
  )
}

export default Header