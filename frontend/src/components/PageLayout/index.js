import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileDisplay from '../UserProfileDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardScreen from '../../screens/DashboardScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import ManageTasksScreen from '../../screens/ManageTasksScreen';
import SideNav from '../SideNav';
import NotFoundScreen from '../../screens/NotFoundScreen';
import { logout } from '../../actions/userActions';
import './styles.scss';
import UserProfileScreen from '../../screens/UserProfileScreen';
import CreateTaskScreen from '../../screens/CreateTaskScreen';
import ViewTaskDetailsScreen from '../../screens/ViewTaskDetailsScreen';
import EditTaskDetailsScreen from '../../screens/EditTaskDetailsScreen';
import StatisticReport from '../StatisticReport';

const PageLayout = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const taskList = useSelector((state) => state.taskList);
  const { tasks } = taskList;

  // Redirect user to login if not login
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  const logoutHandler = () => {
    dispatch(logout(history));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const incompleteCount = tasks.filter((task) => !task.completed).length;

  return (
    <>
      <div className='page'>
        <nav className='page__nav'>
          <UserProfileDisplay />
          <StatisticReport
            completedTasks={completedCount}
            incompleteTasks={incompleteCount}
          />
          <SideNav />
          <button onClick={logoutHandler} className='button--signout'>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>&nbsp;&nbsp;Log out</span>
          </button>
        </nav>
        <main className='page__main'>
          <Switch>
            <Route path={`/dashboard`} exact component={DashboardScreen} />
            <Route
              path={`/dashboard/tasks/create`}
              exact
              component={CreateTaskScreen}
            />
            <Route
              path={`/dashboard/tasks/view/:id`}
              exact
              component={ViewTaskDetailsScreen}
            />
            <Route
              path={`/dashboard/tasks/edit/:id`}
              exact
              component={EditTaskDetailsScreen}
            />
            <Route path={`/manage-tasks`} exact component={ManageTasksScreen} />
            <Route path={`/settings`} exact component={SettingsScreen} />
            <Route
              path={`/settings/profile`}
              exact
              component={UserProfileScreen}
            />
            <Redirect
              from={`/`}
              to={`/dashboard`}
              component={DashboardScreen}
            />
            <Route component={NotFoundScreen} />
          </Switch>
        </main>
        <aside className='page__aside'></aside>
      </div>
    </>
  );
};

export default PageLayout;
