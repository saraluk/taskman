import React from 'react';
import { ButtonRecSolidBlue } from '../Buttons';
import Message from '../Message';
import './styles.scss';

const SignupForm = ({
  signupHandler,
  credential,
  setCredential,
  error,
  message,
}) => {
  return (
    <form className='signup' onSubmit={signupHandler}>
      <input
        className='signup__input'
        type='text'
        name='name'
        placeholder='Name'
        value={credential.name}
        onChange={(e) =>
          setCredential((prevState) => ({ ...prevState, name: e.target.value }))
        }
      />
      <input
        className='signup__input'
        type='text'
        name='email'
        placeholder='Email'
        value={credential.email}
        onChange={(e) =>
          setCredential((prevState) => ({
            ...prevState,
            email: e.target.value,
          }))
        }
      />
      <input
        className='signup__input'
        type='password'
        name='password'
        placeholder='Password (minimum 8 characters)'
        value={credential.password}
        onChange={(e) =>
          setCredential((prevState) => ({
            ...prevState,
            password: e.target.value,
          }))
        }
      />
      <input
        className='signup__input'
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        value={credential.confirmPassword}
        onChange={(e) =>
          setCredential((prevState) => ({
            ...prevState,
            confirmPassword: e.target.value,
          }))
        }
      />
      <ButtonRecSolidBlue text='Sign up' type='submit' />
      {message && <Message variant='text--danger'>{message}</Message>}
      {error && <Message variant='text--danger'>{error}</Message>}
    </form>
  );
};

export default SignupForm;
