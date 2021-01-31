import React from 'react';
import PageHeader from '../../components/PageHeader';

const EditTaskDetailsScreen = ({ history }) => {
  const backHandler = () => {
    history.goBack();
  };

  return (
    <>
      <PageHeader backTo={backHandler}>Edit Task</PageHeader>
    </>
  );
};

export default EditTaskDetailsScreen;
