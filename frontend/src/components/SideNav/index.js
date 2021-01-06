import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTasks, faEdit ,faCog} from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const SideNav = () => {
  return (
    <div className="nav">
      <NavLink to='/' exact activeClassName='is-active--box' className="nav__item">
        <FontAwesomeIcon icon={faTasks}/><span>&nbsp;&nbsp;&nbsp;Dashboard</span>
      </NavLink>
      <NavLink to='/manage-tasks' activeClassName='is-active--box' className="nav__item">
      <FontAwesomeIcon icon={faEdit}/><span>&nbsp;&nbsp;&nbsp;Manage Tasks</span>
      </NavLink>
      <NavLink to='/settings' activeClassName='is-active--box' className="nav__item">
      <FontAwesomeIcon icon={faCog}/><span>&nbsp;&nbsp;&nbsp;Settings</span>
      </NavLink>
    </div>
  )
}

export default SideNav
