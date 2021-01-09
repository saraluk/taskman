import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SignupForm from '../../components/SignupForm';
import './styles.scss';
import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/userActions';

const SignupPage = ({ history }) => {
  const [credential, setCredential] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userSignup = useSelector((state) => state.userSignup);
  const { error } = userSignup;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const signupHandler = async (e) => {
    e.preventDefault();
    if (credential.password !== credential.confirmPassword) {
      setMessage('Password do not match');
    } else {
      setMessage(null);
      dispatch(signup(credential.name, credential.email, credential.password));
    }
  };

  return (
    <div className='signupPage'>
      <div className='signupPage__container'>
        <PageTitle title='Welcome' />
        <div className='signupPage__nav'>
          <NavLink
            to='/login'
            exact={true}
            activeClassName='is-active'
            className='signupPage__nav__item'
          >
            Log in
          </NavLink>
          <NavLink
            to='/signup'
            exact={true}
            activeClassName='is-active'
            className='signupPage__nav__item'
          >
            Sign up
          </NavLink>
        </div>
        <div className='signupPage__form'>
          <SignupForm
            signupHandler={signupHandler}
            credential={credential}
            setCredential={setCredential}
            error={error}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
