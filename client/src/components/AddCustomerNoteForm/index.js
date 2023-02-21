import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_CUSTOMER_NOTE } from '../../utils/mutations';
import { QUERY_CUSTOMER } from '../../utils/queries';

const AddCustomerNoteForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({ noteBody: '' });
  const [addCustomerNote] = useMutation(ADD_CUSTOMER_NOTE, {
    refetchQueries: [{ query: QUERY_CUSTOMER }],
  });

  const validate = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'noteBody':
        if (value.length < 3) {
          errorMessage = 'Please Enter Full Name';
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
        <h3>Add New Customer</h3>
        <form className='flex-column' onSubmit={handleFormSubmit}>
          <input
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
