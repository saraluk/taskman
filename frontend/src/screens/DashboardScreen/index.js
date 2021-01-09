import React, { useEffect } from 'react';
import { ButtonRecRadSolidBlue } from '../../components/Buttons';
import PageTitle from '../../components/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import SearchBar from '../../components/SearchBar';
import TaskTicket from '../../components/TaskTicket';
import { useDispatch, useSelector } from 'react-redux';
import { listTasks } from '../../actions/taskActions';
import Message from '../../components/Message';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const taskList = useSelector((state) => state.taskList);
  const { error, tasks } = taskList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTasks());
    }
  }, [dispatch, userInfo]);

  const createTaskHandler = () => {
    history.push('/dashboard/create-task');
  };

  return (
    <>
      <PageTitle title='Dashboard' />
      <div className='first-row__menu'>
        <ButtonRecRadSolidBlue
          text={
            <span>
              <FontAwesomeIcon icon={faPlus} />
              <span>&nbsp;&nbsp;Create Task</span>
            </span>
          }
          width='150px'
          onClickHandler={createTaskHandler}
        />
        <SearchBar label='Search by Description' />
      </div>
      <div className='second-row__menu'>
        <div className='second-row__menu__filter'>
          <ButtonRecRadSolidBlue
            text='All'
            isActive={true}
            width='120px'
            marginRight='16px'
          />
          <ButtonRecRadSolidBlue
            text='Incomplete'
            isActive={false}
            width='120px'
            marginRight='16px'
          />
          <ButtonRecRadSolidBlue
            text='Completed'
            isActive={false}
            width='120px'
            marginRight='16px'
          />
        </div>
        <SearchBar label='Search by Tag' />
      </div>
      {error ? (
        <Message>{error.message}</Message>
      ) : (
        <div className='tasks__container'>
          {tasks &&
            tasks.map((task) => <TaskTicket key={task._id} task={task} />)}
        </div>
      )}
    </>
  );
};

export default DashboardScreen;
