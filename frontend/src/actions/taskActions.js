import axios from 'axios';
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
} from '../constants/taskConstants';

export const createTask = (
  description,
  details,
  completed,
  dueDate,
  tags,
  history
) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/tasks',
      { description, details, completed, dueDate, tags },
      config
    );
    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data,
    });
    console.log(data);
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: TASK_CREATE_FAIL, payload: error.response.data });
  }
};

export const listTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/tasks', config);
    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: TASK_LIST_FAIL, payload: error.response.data });
  }
};
