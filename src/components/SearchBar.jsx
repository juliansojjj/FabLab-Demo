import React from 'react'
import './Header.css'
import Lupa from '../icons/lupa.svg'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchInputFocus,setSearchInputFocus] = useState(false)
    const [searchBarFocus,setSearchBarFocus] = useState(false)
    const [typeSearch,setTypeSearch] = useState('')

    const handleSearchChange = (e)=>{
        const input = e.target.value
        const filterInput = input.toLowerCase()
        setTypeSearch(filterInput)
      }
      
      const handleSearchSubmit = (e)=>{
        if(typeSearch !== ''){
          setSearchBarFocus(false)
          setTypeSearch(typeSearch.trim())
          sessionStorage.setItem('input', typeSearch);
          navigate(`/card/search/${typeSearch}`)
          window.location.reload()
        }
      }

      document.onclick = ()=>{
        if(searchInputFocus){setSearchInputFocus(false)}
        if(!searchInputFocus && searchBarFocus){setSearchBarFocus(false)}
      }

  return (
    <div className={searchBarFocus ? 'search-bar search-bar--focus' : 'search-bar'}>
        <input 
          type="text"  
          className='search-input' 
          onChange={handleSearchChange}
          value={typeSearch}
          placeholder='Busqueda de Card'
          onFocus={(e)=>{setSearchInputFocus(true);setSearchBarFocus(true)}}/>
        <img src={Lupa} className='search-submit img-min' onClick={handleSearchSubmit}/>
    </div>
  )
}

export default SearchBar