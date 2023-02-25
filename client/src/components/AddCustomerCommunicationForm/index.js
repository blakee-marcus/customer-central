import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IoClose } from 'react-icons/io5';

import { ADD_CUSTOMER_COMMUNICATION } from '../../utils/mutations';
import { QUERY_CUSTOMER } from '../../utils/queries';

const AddCustomerCommunicationForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({
    type: '',
    subject: '',
    date: '',
    notes: '',
  });
  const [addCustomerCommunication] = useMutation(ADD_CUSTOMER_COMMUNICATION, {
    refetchQueries: [
      {
        query: QUERY_CUSTOMER,
        variables: { id: props.customerId },
      },
    ],
  });

  const validate = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'type':
        if (value === '') {
          errorMessage = 'Please Choose a Meeting Type';
        }
        break;
      case 'subject':
        if (!value) {
          errorMessage = 'Please Enter a Subject Line';
        }
        break;
      case 'date':
        if (!value) {
          errorMessage = 'Please Enter a Meeting Date';
        }
        break;
      case 'notes':
        if (!value) {
          errorMessage = 'Please Enter a Notes on the Meeting';
        }
        break;
      default:
        errorMessage = '';
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
    try {
      // add customer to database
      addCustomerCommunication({
        variables: {
          customerId: props.customerId,
          ...formState,
        },
      });

      // clear form value
      setFormState({
        type: '',
        subject: '',
        date: '',
        notes: '',
      });
      props.setCommunicationModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
      <div className='flex-row justify-space-between'>
          <h3 className='mx-auto pl-5 text-header'>Add New Communication:</h3>
          <button
            className='open-modal-btn'
            onClick={() => props.setCommunicationModalVisible(false)}
          >
            <IoClose />
          </button>
        </div>
        <form className='flex-column' onSubmit={handleFormSubmit}>
          <select
            className='signup-form-input'
            placeholder='MEETING TYPE'
            name='type'
            id='type'
            value={formState.type}
            onChange={(e) => setFormState({ ...formState, type: e.target.value })}
            onBlur={handleBlur}
          >
            <option>Please Choose a Type</option>
            <option value='email'>Email</option>
            <option value='phone'>Phone</option>
            <option value='video chat'>Video Chat</option>
            <option value='in person'>In Person</option>
          </select>
          {errorMessage && errorMessage.includes('Type') && <div className='confirmPwError'>{errorMessage}</div>}
          <input
            className='signup-form-input'
            placeholder='SUBJECT'
            name='subject'
            type='text'
            id='subject'
            value={formState.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && errorMessage.includes('Subject') && <div className='confirmPwError'>{errorMessage}</div>}
          <input
            className='signup-form-input'
            name='date'
            type='date'
            id='date'
            value={formState.date}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && errorMessage.includes('Date') && <div className='confirmPwError'>{errorMessage}</div>}
          <textarea
            className='signup-form-input'
            placeholder='NOTES'
            name='notes'
            id='notes'
            value={formState.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && errorMessage.includes('Notes') && <div className='confirmPwError'>{errorMessage}</div>}
          
          <button className='signUpBtn w-50' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerCommunicationForm;
