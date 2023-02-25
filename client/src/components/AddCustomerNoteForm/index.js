import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IoClose } from 'react-icons/io5';

import { ADD_CUSTOMER_NOTE } from '../../utils/mutations';
import { QUERY_CUSTOMER } from '../../utils/queries';

const AddCustomerNoteForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({ noteBody: '' });
  const [addCustomerNote] = useMutation(ADD_CUSTOMER_NOTE, {
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
      case 'noteBody':
        if (value.length === 0) {
          errorMessage = 'Please Enter a Note';
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
      addCustomerNote({
        variables: {
          customerId: props.customerId,
          noteBody: formState.noteBody,
        },
      });

      // clear form value
      setFormState({
        noteBody: '',
      });
      props.setNoteModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='flex-row justify-space-between'>
          <h3 className='mx-auto pl-5 text-header'>Add New Customer Note</h3>
          <button
            className='open-modal-btn'
            onClick={() => props.setNoteModalVisible(false)}
          >
            <IoClose />
          </button>
        </div>
        <form className='flex-column' onSubmit={handleFormSubmit}>
          <textarea
            className='signup-form-input'
            placeholder='NOTE'
            name='noteBody'
            type='textarea'
            id='noteBody'
            value={formState.noteBody}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessage && <div className='confirmPwError'>{errorMessage}</div>}
          <button className='signUpBtn w-50' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerNoteForm;

