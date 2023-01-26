import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [addUser] = useMutation(ADD_USER);
  const validate = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'username':
        if (value.length < 3) {
          errorMessage = 'Username must be more than 3 characters.';
        }
        break;
      case 'email':
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address.';
        }
        break;
      case 'password':
        if (value.length < 8) {
          errorMessage = 'Password must be at least 8 characters long';
        }
        break;
      case 'confirmPassword':
        if (formState.password !== value) {
          errorMessage = 'Does not match password field';
        }
        break;
      default:
        errorMessage = 'Invalid input';
    }
    return errorMessage;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrorMessage(validate(name, value));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('Does not match password field');
      return;
    }

    if (errorMessage) {
      return;
    }
    const { username, email, password } = formState;
    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });

      Auth.login(data.addUser.token);

      window.location.href = '/profile';
    } catch (e) {
      console.error(e);
      if (e.message.includes('username_1 dup key')) {
        setErrorMessage(
          'This username is already taken. Please choose a different username.'
        );
      }
      if (e.message.includes('email_1 dup key')) {
        setErrorMessage('This email is already in use.');
      }
    }
  };

  return (
    <main className='flex-column signup-bg min-100-vh'>
      <div className='flex-column justify-flex-start signup-logo'>
        <p>
          Customer
          <br />
          Central
        </p>
      </div>
      <div className='flex-column signup-container'>
        <h4>CREATE AN ACCOUNT</h4>
        <p className='tagline'>YOUR KEY TO BETTER CUSTOMER RELATIONSHIPS</p>
        <form className='flex-column' onSubmit={handleFormSubmit}>
          <input
            className={`signup-form-input ${
              errorMessage &&
              errorMessage.includes('username') &&
              'signup-input-error'
            } ${
              errorMessage &&
              errorMessage.includes('Username') &&
              'signup-input-error'
            }`}
            placeholder='USERNAME'
            name='username'
            type='username'
            id='username'
            value={formState.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && errorMessage.includes('username') && (
            <div className='confirmPwError'>{errorMessage}</div>
          )}
          {errorMessage && errorMessage.includes('Username') && (
            <div className='confirmPwError'>{errorMessage}</div>
          )}
          <input
            className={`signup-form-input ${
              errorMessage &&
              errorMessage.includes('valid') &&
              'signup-input-error'
            }  ${
              errorMessage &&
              errorMessage.includes('in use') &&
              'signup-input-error'
            }`}
            placeholder='EMAIL'
            name='email'
            type='email'
            id='email'
            value={formState.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && errorMessage.includes('valid') && (
            <div className='confirmPwError'>{errorMessage}</div>
          )}
          {errorMessage && errorMessage.includes('in use') && (
            <div className='confirmPwError'>{errorMessage}</div>
          )}
          <input
            className={`signup-form-input ${
              errorMessage && errorMessage.includes('8') && 'signup-input-error'
            }`}
            placeholder='PASSWORD'
            name='password'
            type='password'
            id='password'
            value={formState.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && errorMessage.includes('8') && (
            <div className='confirmPwError'>{errorMessage}</div>
          )}
          <input
            className={`signup-form-input ${
              errorMessage &&
              errorMessage.includes('match') &&
              'signup-input-error'
            }`}
            placeholder='CONFIRM PASSWORD'
            name='confirmPassword'
            type='password'
            id='confirmPassword'
            value={formState.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && errorMessage.includes('match') && (
            <div className='confirmPwError'>{errorMessage}</div>
          )}
          <button className='signUpBtn w-50' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
