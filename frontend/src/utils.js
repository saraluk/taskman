import { css } from '@emotion/core';

export const getDate = (dueDate) => {
  const date = dueDate.split('T')[0];
  const dateArr = date.split('-');
  return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
};

export const overrideLoaderStyles = css`
  display: grid;
  margin: 0 auto;
`;

export const loaderColor = '#3d5a80';
