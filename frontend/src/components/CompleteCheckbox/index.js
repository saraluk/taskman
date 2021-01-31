import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './styles.scss';

const CompleteCheckbox = ({ setCompleted, completed }) => {
  return (
    <>
      <span onClick={() => setCompleted(!completed)}>
        <label>COMPLETED</label>
        {completed ? (
          <span className='check-icon__circle'>
            <FontAwesomeIcon icon={faCheckCircle} />
          </span>
        ) : (
          <span className='check-icon__circle'>
            <FontAwesomeIcon icon={faCircle} />
          </span>
        )}
      </span>
    </>
  );
};

export default CompleteCheckbox;
