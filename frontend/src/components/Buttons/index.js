import React from 'react'
import './styles.scss'

export const ButtonRecSolidBlue = ({text, type}) =>  (<button className="button button--rec-solid-blue" type={type}>{text}</button>)

export const ButtonRecRadSolidBlue = ({text, width, marginRight = 0, isActive = true, onClickHandler}) => (<button className={`button ${isActive ? "button--rec-rad-solid-blue" : "button--rec-rad-solid-grey"}`} style={{ width: width , marginRight: marginRight}} onClick={onClickHandler}>{text}</button>)


