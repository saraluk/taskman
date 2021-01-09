import React from 'react';
import { Link } from 'react-router-dom';
import Tag from '../Tag';
import './styles.scss';

const TaskTicket = ({ task }) => {
  const { _id, description, completed, dueDate, tags } = task;

  const getDate = () => {
    const date = dueDate.split('T')[0];
    const dateArr = date.split('-');
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
  };

  return (
    <Link to={`/dashboard/tasks/${_id}`} className='task-ticket'>
      <div className='task-ticket__left-column'>
        <div className='task-ticket__detail-list'>
          <span className='task-ticket__detail-list__label'>
            Description :{' '}
            <span className='task-ticket__detail-list__desc'>
              {description}
            </span>
          </span>
        </div>
        <div className='task-ticket__detail-list'>
          <span className='task-ticket__detail-list__label'>
            Tags :{' '}
            {tags &&
              tags.map((tag) => (
                <Tag key={tag._id} tagName={tag.tag} display={true} />
              ))}
          </span>
        </div>
      </div>
      <div className='task-ticket__right-column'>
        <div className='task-ticket__detail-list'>
          <span className='task-ticket__detail-list__label'>
            Status :{' '}
            <span className='task-ticket__detail-list__desc'>
              {completed ? 'Completed' : 'Incomplete'}
            </span>
          </span>
        </div>
        <div className='task-ticket__detail-list'>
          <span className='task-ticket__detail-list__label'>
            Due date :{' '}
            <span className='task-ticket__detail-list__desc'>{getDate()}</span>
          </span>
        </div>
      </div>
      <div
        className={`task-ticket__status-tab ${
          completed ? 'green-tab' : 'red-tab'
        }`}
      ></div>
    </Link>
  );
};

export default TaskTicket;
