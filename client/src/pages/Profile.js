import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CustomerList from '../components/CustomerList';

import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {
  const [profileNavState, setProfileNavState] = useState('Overview');
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user);
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) {
    return (
      <div className='container'>
        <div>Loading...</div>
        <div className='loadingio-spinner-rolling-5y2qfcr8fy'>
          <div className='ldio-lfz02bk665j'>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  if (profileNavState === 'Overview') {
    return (
      <section>
        <div className='flex-row profile-nav'>
          <ul>
            <li
              className='active-profile-nav'
              onClick={() => setProfileNavState('Overview')}
            >
              OVERVIEW
            </li>
            <li onClick={() => setProfileNavState('Notes')}>NOTES</li>
            <li onClick={() => setProfileNavState('Communication')}>
              COMMUNICATION
            </li>
          </ul>
        </div>
        <div className='profile-overview'>
          <div className='flex-column align-center justify-center profile-user'>
            <div data-initials={user.username.charAt(0)}></div>
            <h4>{user.username}</h4>
          </div>
        </div>
      </section>
    );
  }
  if (profileNavState === 'Notes') {
    return (
      <section>
        <div className='flex-row profile-nav'>
          <ul>
            <li onClick={() => setProfileNavState('Overview')}>OVERVIEW</li>
            <li
              className='active-profile-nav'
              onClick={() => setProfileNavState('Notes')}
            >
              NOTES
            </li>
            <li onClick={() => setProfileNavState('Communication')}>
              COMMUNICATION
            </li>
          </ul>
        </div>
      </section>
    );
  }
  if (profileNavState === 'Communication') {
    return (
      <section>
        <div className='flex-row profile-nav'>
          <ul>
            <li onClick={() => setProfileNavState('Overview')}>OVERVIEW</li>
            <li onClick={() => setProfileNavState('Notes')}>NOTES</li>
            <li
              className='active-profile-nav'
              onClick={() => setProfileNavState('Communication')}
            >
              COMMUNICATION
            </li>
          </ul>
        </div>
      </section>
    );
  }
};

export default Profile;
