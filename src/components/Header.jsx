import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Fablab from '../icons/logo.svg'
import userIcon from '../icons/user-solid.svg'

const Logo = styled.img`
  width: 2em;
`;

const HeaderStyle = styled.header`
    position: fixed;
    height: 11vh;
    width: 100vw;
    top: 0;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    align-content: center;
    justify-items: center;
    background-color: white;
    color: black;
    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 0 .2em 1em .1em rgba(0, 0, 0, 0.1);
    text-decoration: none;
`;

const Input = styled.input`
    width: 16em;
    height: 1.4em;
    border-radius: 1em;
`;

const Header = () => {
  return (
    <HeaderStyle>
        <Link to='/'><Logo src={Fablab} /></Link>
        <Input type="text" />
        <Link to="/profile"><img src={userIcon} className='img-min' /></Link>
    </HeaderStyle>
  )
}

export default Header