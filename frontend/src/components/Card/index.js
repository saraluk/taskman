import React from 'react';
import './styles.scss';

const Card = ({ cardColor, cardHeader, children }) => {
  return (
    <div className='card__container'>
      <div className={`card__header ${cardColor}`}>{cardHeader}</div>
      <div className='card__body'>{children}</div>
    </div>
  );
};

export default Card;
