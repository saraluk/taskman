import React from 'react'
import { useDispatch } from 'react-redux'
import UserProfileDisplay from '../UserProfileDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { Route, Switch } from 'react-router-dom'
import DashboardScreen from '../../screens/DashboardScreen'
import SettingsScreen from '../../screens/SettingsScreen'
import ManageTasksScreen from '../../screens/ManageTasksScreen'
import SideNav from '../SideNav'
import NotFoundScreen from '../../screens/NotFoundScreen'
import { logout } from '../../actions/userActions'
import './styles.scss'
import UserProfileScreen from '../../screens/UserProfileScreen'

const PageLayout = ({ history }) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout(history))
  }

  return (
    <>
      <div className="page">
          <nav className="page__nav">
            <UserProfileDisplay/>         
            <SideNav/>
          <button onClick={logoutHandler} className="button--signout"><FontAwesomeIcon icon={faSignOutAlt}/><span>&nbsp;&nbsp;Log out</span></button>
        </nav>
        <main className="page__main">
          <Switch>
            <Route path={`/`} exact component={DashboardScreen}/> 
            <Route path={`/manage-tasks`} exact component={ManageTasksScreen}/> 
            <Route path={`/settings`} exact component={SettingsScreen}/> 
            <Route path={`/settings/profile`} exact component={UserProfileScreen}/> 
            <Route component={NotFoundScreen}/> 
          </Switch>
        </main>
        <aside className="page__aside">
        </aside>
      </div>
    </>
  )
}

export default PageLayout
