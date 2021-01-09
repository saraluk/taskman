import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './styles.scss';

const Tag = ({ removeTagHandler, tagName, display }) => {
  return (
    <span className='tag'>
      {tagName}
      {!display && (
        <span
          className='remove-tag__icon'
          onClick={() => removeTagHandler(tagName)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      )}
    </span>
  );
};

export default Tag;
