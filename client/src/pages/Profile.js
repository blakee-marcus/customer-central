import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { HiUserAdd } from 'react-icons/hi';

import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';

import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {
  const [profileNavState, setProfileNavState] = useState('Overview');
  const [modalVisible, setModalVisible] = useState(false);
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

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
    return <Navigate to='/' />;
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
        <div className='profile-overview flex-row'>
          <div className='flex-column align-center justify-center profile-user w-25'>
            <div data-initials={user.username.charAt(0)}></div>
            <h4>{user.username}</h4>
          </div>
          <div className='flex-column w-50 mx-auto customer-list-container'>
            <div className='flex-row justify-space-between'>
              <h3>Customers ({user.customers.length})</h3>
              <button
                className='addCustomerBtn'
                onClick={() => setModalVisible(true)}
              >
                <HiUserAdd />
              </button>
              {modalVisible && (
                <CustomerForm setModalVisible={setModalVisible} />
              )}
            </div>
            <CustomerList customers={user.customers} />
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
