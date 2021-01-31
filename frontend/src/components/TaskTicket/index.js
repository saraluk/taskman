import React from 'react';
import { Link } from 'react-router-dom';
import { getDate } from '../../utils';
import Tag from '../Tag';
import { ButtonRecRadSolidGreyMini } from '../Buttons/index.js';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const TaskTicket = ({
  task,
  changeTaskStatusHandler,
  deleteTaskHandler,
  editTaskHandler,
}) => {
  const { _id, description, completed, dueDate, tags } = task;

  return (
    <Link to={`/dashboard/tasks/view/${_id}`} className='task-ticket'>
      <div className='task-ticket__checkbox'>
        <FontAwesomeIcon
          icon={completed ? faCheckSquare : faSquare}
          onClick={() => changeTaskStatusHandler(task._id)}
        />
      </div>
      <div className='task-ticket__desc'>
        <pre>{description}</pre>
        <div className='tags'>
          {tags && tags.map((tag) => <Tag key={tag._id} tagName={tag.tag} />)}
        </div>
      </div>
      <div className='task-ticket__status__date'>
        <p>
          Status : <span>{completed ? 'Completed' : 'Incomplete'}</span>
        </p>
        <p>
          Due date : <span>{dueDate && getDate(dueDate)}</span>
        </p>
      </div>
      <div className='task-ticket__buttons'>
        <ButtonRecRadSolidGreyMini
          onClickHandler={(e) => editTaskHandler(e, _id)}
        >
          Edit
        </ButtonRecRadSolidGreyMini>
        <ButtonRecRadSolidGreyMini
          onClickHandler={(e) => deleteTaskHandler(e, _id)}
        >
          Delete
        </ButtonRecRadSolidGreyMini>
      </div>
      <div
        className={`task-ticket__color-tab ${
          completed ? 'green-tab' : 'red-tab'
        }`}
      ></div>
    </Link>
  );
};

export default TaskTicket;
