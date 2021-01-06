import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src="app-logo.png" alt=""/>
      <button className="header__button--signout">Sign Out <FontAwesomeIcon icon={faSignOutAlt}/></button>
    </header>
  )
}

export default Header
