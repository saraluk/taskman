import React from 'react';
import './styles.scss';

const StatisticReport = ({ completedTasks, incompleteTasks }) => {
  return (
    <div className='report'>
      <div>
        <label>Incomplete</label>
        <p>{incompleteTasks}</p>
      </div>
      <div>
        <label>Completed</label>
        <p>{completedTasks}</p>
      </div>
    </div>
  );
};

export default StatisticReport;
