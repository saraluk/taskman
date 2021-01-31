import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDetailsReducer,
  userLoginReducer,
  userSignupReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  taskCreateReducer,
  taskDeleteReducer,
  taskDetailsReducer,
  taskListReducer,
} from './reducers/taskReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  taskList: taskListReducer,
  taskDetails: taskDetailsReducer,
  taskCreate: taskCreateReducer,
  taskDelete: taskDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
