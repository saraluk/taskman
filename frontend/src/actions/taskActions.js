import axios from 'axios';
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
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

export const getTaskDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/${id}`, config);
    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: TASK_DETAILS_FAIL, payload: error.response.data });
  }
};

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/tasks/${id}`, config);
    dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: TASK_DELETE_FAIL, payload: error.response.data });
  }
};
