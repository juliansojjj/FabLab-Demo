import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Fablab from '../icons/logo.svg'
import userIcon from '../icons/user-solid.svg'
import './Header.css'

const Logo = styled.img`
  width: 1.8em;
`;

const Header = () => {
  return (
    <header>
        <Link to='/'><Logo src={Fablab} /></Link>
        <input type="text" className='search-bar' placeholder='Busqueda de Card'/>
        <Link to="/profile"><img src={userIcon} className='img-min' /></Link>
    </header>
  )
}

export default Header