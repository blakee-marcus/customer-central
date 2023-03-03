import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      console.log(Auth.login(data.login.token));
      window.location.href = '/profile';
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const formFilled = formState.email !== '' && formState.password !== '';
    const button = document.querySelector('button');
    if (formFilled) {
      button.classList.add('filled');
    } else {
      button.classList.remove('filled');
    }
  }, [formState]);

  return (
    <div className='flex-row align-stretch min-100-vh'>
      <div className='col-3 login-section-container'>
        <div className='flex-column login-logo'>
          <p>
            Customer
            <br />
            Central
          </p>
        </div>
        <h4>Sign in</h4>
        <div className='form-container'>
          <form onSubmit={handleFormSubmit}>
            <input
              className='form-input'
              placeholder='EMAIL'
              name='email'
              type='email'
              id='email'
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className='form-input'
              placeholder='PASSWORD'
              name='password'
              type='password'
              id='password'
              value={formState.password}
              onChange={handleChange}
            />
            {error && (
              <div className='login-error'>
                Your login credentials don't match an account in our system.
              </div>
            )}
            <button className='loginBtn'>
                <FaArrowRight />
            </button>
          </form>
          <Link to='/signup' className='link'>
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
      <div className='col-9 login-splash'></div>
    </div>
  );
};

export default Login;
