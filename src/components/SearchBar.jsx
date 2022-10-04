import React from 'react'
import './Header.css'
import Lupa from '../icons/lupa.svg'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useGetDocsQuery } from '../app/cardsApi'

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data, error, isError } = useGetDocsQuery();
    const [searchInputFocus,setSearchInputFocus] = useState(false)
    const [searchBarFocus,setSearchBarFocus] = useState(false)
    const [typeSearch,setTypeSearch] = useState('')
    let arrayData = ['']

    if (data){
      arrayData = [...data]
      arrayData = arrayData.filter(item=>item.title)
      if(typeSearch.trim()){
        arrayData = arrayData.filter(item=>item.title.toLowerCase().toString().includes(typeSearch))
      }
    }

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
    <div>
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
      {typeSearch.trim() 
        ? <div className='search-options'>
            <Link to={`/card/search/${typeSearch}`} className='search-options--child options-grid'>
              <span className='options-grid-typeCell'>{typeSearch}</span>
              <span>Buscar</span>  
            </Link>
            {arrayData 
              ? arrayData.map(item=>{
                return(
                  <Link to={`/card/${item.id}`} className='search-options--child' key={item.id}>{item.title}</Link>
              )
            }) : ''}
          </div> 
        : ''}
    </div>
  )
}

export default SearchBar