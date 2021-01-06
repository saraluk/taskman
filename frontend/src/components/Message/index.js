import React from 'react'
import './styles.scss'

const Message = ({ variant, children }) => {
  return (
      <p className={variant}>{ children }</p>
  )
}

Message.defaultProps = {
  variant: 'text--danger'
}

export default Message


