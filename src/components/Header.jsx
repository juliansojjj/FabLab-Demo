import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Fablab from '../icons/logo.svg'
import userIcon from '../icons/user-solid.svg'
import './Header.css'

const Logo = styled.img`
  width: 1.8em;
`;

const Input = styled.input`
    width: 16em;
    height: 1em;
    border-radius: 1em;
    padding: .2em;
`;

const Header = () => {
  return (
    <header>
        <Link to='/'><Logo src={Fablab} /></Link>
        <Input type="text" />
        <Link to="/profile"><img src={userIcon} className='img-min' /></Link>
    </header>
  )
}

export default Header