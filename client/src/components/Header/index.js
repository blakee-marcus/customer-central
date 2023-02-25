import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  if (window.location.pathname !== '/signup' && window.location.pathname !== '/') {
    return (
      <header className='flex-row align-center col-12'>
        <nav className='flex-row align-center justify-flex-start col-12'>
          <div className='main-nav'>
            <Link to='/profile'>Customer Central</Link>
          </div>
          {Auth.loggedIn() ? (
            <>
              <Link to='/profile' className='nav-hover'>
                Profile
              </Link>
              <a href='/' onClick={logout} className='nav-hover'>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to='/' className='nav-hover'>
                Login
              </Link>
              <Link to='/signup' className='nav-hover'>
                Signup
              </Link>
            </>
          )}
        </nav>
      </header>
    );
  }
};

export default Header;

