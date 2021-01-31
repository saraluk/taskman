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

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true };
    case TASK_CREATE_SUCCESS:
      return { loading: false, taskInfo: action.payload };
    case TASK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_LIST_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskDetailsReducer = (state = { task: { tags: [] } }, action) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskDeleteReducer = (state = { task: { tags: [] } }, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true, ...state };
    case TASK_DELETE_SUCCESS:
      return {
        loading: false,
        task: action.payload,
      };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
