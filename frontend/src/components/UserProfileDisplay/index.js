import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';

const UserProfileDisplay = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className='user-profile__block'>
      {userInfo && (
        <>
          <img
            className='user-profile__block__image'
            src='https://www.nicepng.com/png/detail/144-1446162_pin-businessman-clipart-png-flat-user-icon.png'
            alt='user'
          />
          <p className='user-profile__block__title'>{userInfo.user.name}</p>
          <p className='user-profile__block__subtitle'>
            {userInfo && userInfo.user.email}
          </p>
        </>
      )}
    </div>
  );
};

export default UserProfileDisplay;
