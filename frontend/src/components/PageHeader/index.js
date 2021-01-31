import React from 'react';
import { BackButtonRoundWhite } from '../Buttons';
import PageTitle from './PageTitle';

import './styles.scss';

const PageHeader = ({ children, backTo }) => {
  return (
    <header className='page-header'>
      <BackButtonRoundWhite backTo={backTo} />
      <PageTitle>{children}</PageTitle>
    </header>
  );
};

export default PageHeader;
