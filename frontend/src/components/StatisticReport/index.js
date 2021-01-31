import React from 'react';

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
