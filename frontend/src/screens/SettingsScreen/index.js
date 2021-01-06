import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutAll } from '../../actions/userActions'
import MenuList from '../../components/MenuList'
import PageTitle from '../../components/PageTitle'

const SettingsScreen = ({ history }) => {
  const dispatch = useDispatch()
  const openUserProfileHandler = () => {
    history.push('/settings/profile')
  }

  const logoutAllHandler = () => {
    dispatch(logoutAll(history))
    
  }
  return (
    <>
    <PageTitle title="Settings"/>
    <MenuList menuLabel={'User profile'} buttonLabel={'Edit'} onClickHandler={openUserProfileHandler}/>
    <MenuList menuLabel={'Log out from all devices'} buttonLabel={'Log out All'} onClickHandler={logoutAllHandler}/>
    <MenuList menuLabel={'Delete account'} buttonLabel={'Delete'}/>
    </>
  )
}

export default SettingsScreen
