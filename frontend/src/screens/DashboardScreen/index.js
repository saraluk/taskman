import React, { useEffect } from 'react';
import { ButtonRecRadSolidBlue } from '../../components/Buttons';
import PageTitle from '../../components/PageHeader/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import SearchBar from '../../components/SearchBar';
import TaskTicket from '../../components/TaskTicket';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, listTasks } from '../../actions/taskActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks } = taskList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTasks());
    } else {
      history.push('/dashboard?redirect=login');
    }
  }, [dispatch, userInfo, history]);

  const createTaskHandler = () => {
    history.push('/dashboard/tasks/create');
  };

  // TODO: Implement function to toggle task status
  const changeTaskStatusHandler = () => {
    //
  };

  // TODO: when delete task, sometimes the deleted task still show on the screen
  const deleteTaskHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteTask(id));
    dispatch(listTasks());
  };

  const editTaskHandler = (e, id) => {
    e.preventDefault();
    history.push(`/dashboard/tasks/edit/${id}`);
  };

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className='first-row__menu'>
            <ButtonRecRadSolidBlue
              width='150px'
              onClickHandler={createTaskHandler}
            >
              {' '}
              <span>
                <FontAwesomeIcon icon={faPlus} />
                <span>&nbsp;&nbsp;Create Task</span>
              </span>
            </ButtonRecRadSolidBlue>
            <SearchBar label='Search by Description' />
          </div>
          <div className='second-row__menu'>
            <div className='second-row__menu__filter'>
              <ButtonRecRadSolidBlue
                isActive={true}
                width='120px'
                marginRight='16px'
              >
                All
              </ButtonRecRadSolidBlue>
              <ButtonRecRadSolidBlue
                isActive={false}
                width='120px'
                marginRight='16px'
              >
                Incomplete
              </ButtonRecRadSolidBlue>
              <ButtonRecRadSolidBlue
                isActive={false}
                width='120px'
                marginRight='16px'
              >
                Completed
              </ButtonRecRadSolidBlue>
            </div>
            <SearchBar label='Search by Tag' />
          </div>
          <div className='result__text'>
            <p>Result : {tasks && tasks.length} </p>
          </div>
          {error ? (
            <Message>{error.message}</Message>
          ) : (
            <div className='tasks__container'>
              {tasks.length > 0 &&
                tasks.map((task) => (
                  <TaskTicket
                    key={task._id}
                    task={task}
                    changeTaskStatusHandler={changeTaskStatusHandler}
                    deleteTaskHandler={deleteTaskHandler}
                    editTaskHandler={editTaskHandler}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DashboardScreen;
