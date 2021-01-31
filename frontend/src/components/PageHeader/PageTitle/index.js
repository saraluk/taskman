import React from 'react';
import './styles.scss';

const PageTitle = ({ children }) => {
  return (
    <>
      <h1 className='page__title'>{children}</h1>
    </>
  );
};

export default PageTitle;
