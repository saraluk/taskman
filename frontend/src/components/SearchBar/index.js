import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const SearchBar = ({ label }) => {
  return (
    <div className="search-bar">
      <p className="search-bar__label">{label}</p>
      <div className="search-bar__box">
        <input className="search-bar__input"/>
        <FontAwesomeIcon icon={faSearch} className="search-bar__icon"/>
      </div>
    </div>
  )
}

export default SearchBar
