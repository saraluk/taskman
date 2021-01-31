import React from 'react';
import { overrideLoaderStyles, loaderColor } from '../../utils';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = ({ loading }) => {
  return (
    <ClipLoader
      loading={loading}
      css={overrideLoaderStyles}
      color={loaderColor}
    />
  );
};

export default Loader;
