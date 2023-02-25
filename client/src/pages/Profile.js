import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { HiUserAdd } from 'react-icons/hi';

import CustomerList from '../components/CustomerList';
import AddCustomerForm from '../components/AddCustomerForm';
import CustomerNoteList from '../components/CustomerNoteList';
import CustomerCommunicationList from '../components/CustomerCommunicationList';

import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME, NOTES_WRITTEN_BY, COMMUNICATION_WRITTEN_BY } from '../utils/queries';


const Profile = () => {
  const [profileNavState, setProfileNavState] = useState('Customers');
  const [modalVisible, setModalVisible] = useState(false);
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};
  
  const { loading: loadingNotes, data: noteData } = useQuery(NOTES_WRITTEN_BY, {
    variables: { username: user.username },
  });
  const notes = noteData?.notesWrittenBy;

  const { loading: loadingCommunication, data: communicationData } = useQuery(COMMUNICATION_WRITTEN_BY, {
    variables: { participants: user.username },
  });
  const communications = communicationData?.communicationWrittenBy;

  console.log(communications);
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading || loadingNotes || loadingCommunication) {
    return (
      <div className='container'>
        <div className='text-primary'>{`Loading ${profileNavState}...`}</div>
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

  if (profileNavState === 'Customers') {
    return (
      <section className='h-100'>
        <div className='flex-row sub-nav'>
          <ul>
            <li
              className='active-sub-nav'
              onClick={() => setProfileNavState('Customers')}
            >
              CUSTOMERS
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
              <h3 className='text-header'>Customers ({user.customers.length})</h3>
              <button
                className='open-modal-btn'
                onClick={() => setModalVisible(true)}
              >
                <HiUserAdd />
              </button>
              {modalVisible && (
                <AddCustomerForm setModalVisible={setModalVisible} />
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
        <div className='flex-row sub-nav'>
          <ul>
            <li onClick={() => setProfileNavState('Customers')}>CUSTOMERS</li>
            <li
              className='active-sub-nav'
              onClick={() => setProfileNavState('Notes')}
            >
              NOTES
            </li>
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
              <h3 className='text-header'>Notes ({notes.length})</h3>
            </div>
            <CustomerNoteList notes={notes} displayMode='User'/>
          </div>
        </div>
      </section>
    );
  }

  if (profileNavState === 'Communication') {
    return (
      <section>
        <div className='flex-row sub-nav'>
          <ul>
            <li onClick={() => setProfileNavState('Customers')}>CUSTOMERS</li>
            <li onClick={() => setProfileNavState('Notes')}>NOTES</li>
            <li
              className='active-sub-nav'
              onClick={() => setProfileNavState('Communication')}
            >
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
              <h3 className='text-header'>Communication History ({communications.length})</h3>
            </div>
            <CustomerCommunicationList communications={communications} displayMode='User'/>
          </div>
        </div>
      </section>
    );
  }
};

export default Profile;

