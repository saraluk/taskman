import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './styles.scss';

export const ButtonRecSolidBlue = ({ text, type }) => (
  <button className='button button--rec-solid-blue' type={type}>
    {text}
  </button>
);

export const ButtonRecSolidGrey = ({
  children,
  onClickHandler,
  width = '100px',
}) => (
  <button
    className='button button--rec-solid-grey'
    onClick={onClickHandler}
    style={{ width: width }}
    type='button'
  >
    {children}
  </button>
);

export const ButtonRecRadSolidBlue = ({
  children,
  width = '140px',
  marginRight = 0,
  isActive = true,
  onClickHandler,
}) => (
  <button
    className={`button ${
      isActive ? 'button--rec-rad-solid-blue' : 'button--rec-rad-solid-grey'
    }`}
    style={{ width: width, marginRight: marginRight }}
    onClick={onClickHandler}
  >
    {children}
  </button>
);

export const ButtonRecRadSolidGreyMini = ({
  children,
  onClickHandler,
  width = '80px',
}) => (
  <button
    className='button button--rec-rad-solid-grey button--mini'
    onClick={onClickHandler}
    style={{ width: width }}
    type='button'
  >
    {children}
  </button>
);

export const SubmitButtonRecRadSolidBlue = ({
  children,
  width = '140px',
  marginRight = 0,
  isActive = true,
}) => (
  <button
    className={`button ${
      isActive ? 'button--rec-rad-solid-blue' : 'button--rec-rad-solid-grey'
    }`}
    style={{ width: width, marginRight: marginRight }}
    type='submit'
  >
    {children}
  </button>
);

export const BackButtonRoundWhite = ({ backTo }) => (
  <button className='button button--round-white' onClick={backTo}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);
