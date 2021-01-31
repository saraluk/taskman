import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import {
  ButtonRecRadSolidBlue,
  SubmitButtonRecRadSolidBlue,
} from '../../components/Buttons';
import Message from '../../components/Message';
import PageHeader from '../../components/PageHeader';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import './styles.scss';

const UserProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [updated, setUpdated] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { error, success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        if (success) {
          setUpdated(true);
        }
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);
    setUpdated(false);
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  };

  const cancelHandler = () => {
    history.push('/settings');
  };

  const backHandler = () => {
    history.push('/settings');
  };

  return (
    <>
      <PageHeader backTo={backHandler}>User Profile</PageHeader>
      {updated ? (
        <Message variant='text--success'>Profile updated</Message>
      ) : (
        <Message variant='text--success-collapse'></Message>
      )}
      <form className='form' onSubmit={submitHandler}>
        <div className='form__group-input'>
          <label>Name</label>
          <input
            className='form__input input--short'
            type='text'
            name='name'
            value={name}
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form__group-input'>
          <label>Email</label>
          <input
            className='form__input input--short'
            type='text'
            name='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form__group-input'>
          <label>Password</label>
          <input
            className='form__input input--short'
            type='password'
            name='password'
            value={password}
            placeholder='Enter password (minimum 8 characters)'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form__group-input'>
          <label>Confirm Password</label>
          <input
            className='form__input input--short'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='group-buttons'>
          <SubmitButtonRecRadSolidBlue marginRight='16px'>
            Update
          </SubmitButtonRecRadSolidBlue>
          <ButtonRecRadSolidBlue onClickHandler={cancelHandler}>
            Cancel
          </ButtonRecRadSolidBlue>
        </div>
      </form>
      {message && <Message variant='text--danger'>{message}</Message>}
      {error && <Message variant='text--danger'>{error}</Message>}
    </>
  );
};

export default UserProfileScreen;
