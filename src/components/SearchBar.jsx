import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectCards } from '../features/content/contentSlice'
import Lupa from '../icons/lupa.svg'
import './Header.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const data = useSelector(selectCards);
    const [searchInputFocus,setSearchInputFocus] = useState(false)
    const [searchBarFocus,setSearchBarFocus] = useState(false)
    const [typeSearch,setTypeSearch] = useState('')
    let arrayData = ['']

    if (data){
      arrayData = data.filter(item=>item.title)
      if(typeSearch.trim()){
        arrayData = arrayData.filter(item=>item.title.toLowerCase().toString().includes(typeSearch))
      }
    }

    const handleSearchChange = (e)=>{
        const input = e.target.value
        const filterInput = input.toLowerCase()
        setTypeSearch(filterInput)
      }
      
      document.onclick = ()=>{
        if(searchInputFocus){setSearchInputFocus(false)}
        if(!searchInputFocus && searchBarFocus){setSearchBarFocus(false)}
      }

  return (
    <div>
      <div className={searchBarFocus ? 'search-bar search-bar--focus' : 'search-bar'}>
          <input 
            type="text"  
            className='search-input' 
            onChange={handleSearchChange}
            value={typeSearch}
            placeholder='Busqueda de Card'
            onFocus={(e)=>{setSearchInputFocus(true);setSearchBarFocus(true)}}/>
          <img src={Lupa} alt='searchLogo' className='search-submit img-min' />
      </div>
      {typeSearch.trim() &&
          <div className='search-options'>
            {arrayData &&
              arrayData.map(item=>{
                return(
                  <Link to={`/card/${item.id}`} className='search-options--child' key={item.id}>{item.title}</Link>
              )
            })
            }
          </div> 
       }
    </div>
  )
}

export default SearchBar