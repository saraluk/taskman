import React from 'react'
import { ButtonRecRadSolidBlue } from '../Buttons'
import './styles.scss'

const MenuList = ({ menuLabel, buttonLabel, onClickHandler}) => {
  return (
    <div className="menu-list">
      <p>{menuLabel}</p>
      <ButtonRecRadSolidBlue text={buttonLabel} width={'140px'} onClickHandler={onClickHandler}/>
    </div>
  )
}

export default MenuList
