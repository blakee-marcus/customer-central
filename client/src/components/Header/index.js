import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  if (
    window.location.pathname !== '/signup' &&
    window.location.pathname !== '/'
  ) {
    return (
      <header className='flex-row align-center col-12'>
        {/* <div className='container flex-row justify-space-between-lg justify-center align-center'> */}

        <nav className='flex-row align-center justify-flex-start col-12'>
          <div className='main-nav'>
            <Link to='/profile'>Customer Central</Link>
          </div>
          {Auth.loggedIn() ? (
            <>
              <Link to='/profile'>Profile</Link>
              <a href='/' onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to='/'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </>
          )}
        </nav>
        {/* </div> */}
      </header>
    );
  }
};

export default Header;
