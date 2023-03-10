import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SlNote } from 'react-icons/sl';

import CustomerNoteList from '../components/CustomerNoteList';
import AddCustomerNoteForm from '../components/AddCustomerNoteForm';
import CustomerCommunicationList from '../components/CustomerCommunicationList';
import AddCustomerCommunicationForm from '../components/AddCustomerCommunicationForm';

import { QUERY_CUSTOMER } from '../utils/queries';

const Customer = () => {
  const { customerId: customerParam } = useParams();

  const { loading, data } = useQuery(QUERY_CUSTOMER, {
    variables: { id: customerParam },
  });

  const [navState, setNavState] = useState('Notes');
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [communicationModalVisible, setCommunicationModalVisible] =
    useState(false);

  if (loading) {
    return (
      <div className='container'>
        <div className='text-primary'>Loading...</div>
        <div className='loadingio-spinner-rolling-5y2qfcr8fy'>
          <div className='ldio-lfz02bk665j'>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  if (navState === 'Notes') {
    return (
      <section>
        <div className='flex-row sub-nav'>
          <ul>
            <li className='active-sub-nav'>NOTES</li>
            <li onClick={() => setNavState('Communication')}>COMMUNICATION</li>
          </ul>
        </div>
        <div className='profile-overview flex-row'>
          <div className='flex-column w-25 ml-5 mt-3'>
            <div
              data-initials={data.customer.name.charAt(0)}
              className='align-center justify-center mx-auto'
            ></div>
            <div className='customer-info'>
              <h4>NAME:</h4>
              <p>{data.customer.name}</p>
            </div>
            <div className='customer-info'>
              <h4>EMAIL:</h4>
              <a href={`mailto:${data.customer.email}`}>
                {data.customer.email}
              </a>
            </div>
            <div className='customer-info'>
              <h4>PHONE:</h4>
              <a href={`tel:${data.customer.phone}`}>{data.customer.phone}</a>
            </div>
            <div className='customer-info'>
              <h4>ADDRESS:</h4>
              <a href={`http://maps.google.com/?q=${data.customer.address}`}>
                {data.customer.address}
              </a>
            </div>
          </div>
          <div className='flex-column w-50 mx-auto customer-list-container'>
            <div className='flex-row justify-space-between'>
              <h3 className='text-header'>Notes ({data.customer.notes.length})</h3>
              <button
                className='open-modal-btn'
                onClick={() => setNoteModalVisible(true)}
              >
                <SlNote />
              </button>
              {noteModalVisible && (
                <AddCustomerNoteForm
                  setNoteModalVisible={setNoteModalVisible}
                  customerId={data.customer._id}
                />
              )}
            </div>
            <CustomerNoteList notes={data.customer.notes} displayMode='Customer'/>
          </div>
        </div>
      </section>
    );
  }

  if (navState === 'Communication') {
    return (
      <section>
        <div className='flex-row sub-nav'>
          <ul>
            <li onClick={() => setNavState('Notes')}>NOTES</li>
            <li className='active-sub-nav'>COMMUNICATION</li>
          </ul>
        </div>
        <div className='profile-overview flex-row'>
          <div className='flex-column w-25 ml-5 mt-3'>
            <div
              data-initials={data.customer.name.charAt(0)}
              className='align-center justify-center mx-auto'
            ></div>
            <div className='customer-info'>
              <h4>NAME:</h4>
              <p>
                <span>{data.customer.name}</span>
              </p>
            </div>
            <div className='customer-info'>
              <h4>EMAIL:</h4>
              <p>
                <span>{data.customer.email}</span>
              </p>
            </div>
            <div className='customer-info'>
              <h4>PHONE:</h4>
              <p>
                <span>{data.customer.phone}</span>
              </p>
            </div>
            <div className='customer-info'>
              <h4>ADDRESS:</h4>
              <p>
                <span>{data.customer.address}</span>
              </p>
            </div>
          </div>
          <div className='flex-column w-50 mx-auto customer-list-container'>
            <div className='flex-row justify-space-between'>
              <h3 className='text-header'>Past Contact ({data.customer.communicationCount})</h3>
              <button
                className='open-modal-btn'
                onClick={() => setCommunicationModalVisible(true)}
              >
                <SlNote />
              </button>
              {communicationModalVisible && (
                <AddCustomerCommunicationForm
                  setCommunicationModalVisible={setCommunicationModalVisible}
                  customerId={data.customer._id}
                />
              )}
            </div>
            <CustomerCommunicationList
              communications={data.customer.communicationHistory}
              displayMode='Customer'
            />
          </div>
        </div>
      </section>
    );
  }
};

export default Customer;

