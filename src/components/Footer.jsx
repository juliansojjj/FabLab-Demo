import React from 'react'
import styled from 'styled-components'

const Foot = styled.footer`
    display: flex;    
    height: 5em;
    width: 100%;
    position: absolute;
    bottom: 0;
    color: white;
    background-color: #255887;
    //box-shadow: 0 -.2em 1em .1em rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
`;

const Footer = () => {
  return (
    <Foot>
        Este es el footer (si es que le ponemos)
    </Foot>
  )
}

export default Footer