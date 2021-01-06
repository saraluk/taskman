import React from 'react'
import './styles.scss'

const UserProfileDisplay = () => {


  // TODO render user's name & email based on userLogin.userInfo && userUpdateProfile.userInfo


  return (
    <div className="user-profile__block">
      <img className="user-profile__block__image" src="https://www.nicepng.com/png/detail/144-1446162_pin-businessman-clipart-png-flat-user-icon.png" alt="user"/>
      <p className="user-profile__block__title">Saraluk</p>
      <p className="user-profile__block__subtitle">email</p>
    </div>
  )
}

export default UserProfileDisplay
