import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Fablab from '../icons/logo.svg'
import userIcon from '../icons/user-gear-solid.svg'
import menu from '../icons/aside-solid.svg'
import './Header.css'
import SearchBar from './SearchBar';
import Aside from './Aside';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [responsiveMenu, setResponsiveMenu] = useState(false);

  console.log(location)
  const menuHandle = (e)=>{
    if(location.pathname === '/'){
      if(responsiveMenu) {
        setResponsiveMenu(false)
        document.body.style.overflow = 'auto';
      }else {
        setResponsiveMenu(true)
        document.body.style.overflow = 'hidden';  
      }}
  }

  useEffect(() => {
    setResponsiveMenu(false)
        document.body.style.overflow = 'auto';
  }, [location]);

  return (
    <div>
    <header>
        <div>
          <Link to='/'><img src={Fablab} className='img-logo web-logo' replace /></Link>
          {location.pathname === '/' ? 
          <img src={menu} className='img-responsive' alt='MenuLogo' onClick={menuHandle}/> 
          : <Link to='/'><img src={Fablab} alt='FabLabLogo' className='img-logo responsive-logo' replace /></Link>
            
          }
          
          
        </div>
        <SearchBar/>
        <Link to="/profile"><img alt='ProfileLogo' src={userIcon} className='img-min' replace /></Link>
    </header>
    {responsiveMenu &&
      <div>
        <div className='responsiveMenu'>
          <Aside responsive={true}/>
        </div>
        <div className='blackScreen' onClick={menuHandle}></div>
      </div>
    }
    </div>
  )
}

export default Header