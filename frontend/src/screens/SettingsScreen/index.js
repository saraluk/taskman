import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAll } from '../../actions/userActions';
import MenuList from '../../components/MenuList';
import PageTitle from '../../components/PageHeader/PageTitle';
import './styles.scss';

const SettingsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  const openUserProfileHandler = () => {
    history.push('/settings/profile');
  };

  const logoutAllHandler = () => {
    dispatch(logoutAll(history));
  };
  return (
    <>
      <PageTitle>Setting</PageTitle>
      <MenuList
        menuLabel={'User profile'}
        buttonLabel={'Edit'}
        onClickHandler={openUserProfileHandler}
      />
      <MenuList
        menuLabel={'Log out from all devices'}
        buttonLabel={'Log out All'}
        onClickHandler={logoutAllHandler}
      />
      <MenuList menuLabel={'Delete account'} buttonLabel={'Delete'} />
    </>
  );
};

export default SettingsScreen;
