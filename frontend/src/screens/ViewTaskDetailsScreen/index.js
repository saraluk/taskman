import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTaskDetails } from '../../actions/taskActions';
import { ButtonRecRadSolidBlue } from '../../components/Buttons';
import Card from '../../components/Card';
import PageHeader from '../../components/PageHeader';
import Tag from '../../components/Tag';
import { getDate } from '../../utils';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import './styles.scss';

const ViewTaskDetailsScreen = ({ history, match }) => {
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();

  const taskDetails = useSelector((state) => state.taskDetails);
  const { loading, error, task } = taskDetails;

  const taskDelete = useSelector((state) => state.taskDelete);
  const { task: deletedTask } = taskDelete;

  useEffect(() => {
    dispatch(getTaskDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const backHandler = () => {
    history.goBack();
  };

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
    if (deletedTask) {
      setDeleted(true);
      setTimeout(() => {
        history.goBack();
      }, 1000);
    }
  };

  const editTaskHandler = (id) => {
    history.push(`/dashboard/tasks/edit/${id}`);
  };

  const { _id, description, details, completed, dueDate, tags } = task;
  return (
    <div className='task-details'>
      <PageHeader backTo={backHandler}>Task Details</PageHeader>
      {loading ? (
        <Loader loading={loading} />
      ) : error ? (
        <Message>{error}</Message>
      ) : deleted ? (
        <Message variant='text--success'>The task has been deleted.</Message>
      ) : (
        <>
          <Card
            cardColor={completed ? 'green-tab' : 'red-tab'}
            cardHeader={completed ? 'Completed' : 'Incomplete'}
          >
            <div className='card__group-input'>
              <label>Description</label>
              <p>{description}</p>
            </div>
            <div className='card__group-input'>
              <label>Details</label>
              <pre>{details ? details : '-'}</pre>
            </div>
            <div className='card__group-input'>
              <label>Due Date</label>
              <p>{dueDate && getDate(dueDate)}</p>
            </div>
            <div className='card__group-input'>
              <label>Tags</label>
              <div className='tags'>
                {tags.length > 0 &&
                  tags.map((tag) => <Tag key={tag._id} tagName={tag.tag} />)}
              </div>
            </div>
          </Card>
          <div className='group-buttons'>
            <ButtonRecRadSolidBlue
              marginRight='16px'
              onClickHandler={() => editTaskHandler(_id)}
            >
              Edit
            </ButtonRecRadSolidBlue>
            <ButtonRecRadSolidBlue
              onClickHandler={() => deleteTaskHandler(_id)}
            >
              Delete
            </ButtonRecRadSolidBlue>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewTaskDetailsScreen;
