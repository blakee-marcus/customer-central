import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IoClose } from 'react-icons/io5';

import { ADD_CUSTOMER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const AddCustomerForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [addCustomer] = useMutation(ADD_CUSTOMER, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const validate = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (value.length < 1) {
          errorMessage = 'Please Enter Full Name';
        }
        break;
      case 'email':
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address.';
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
      addCustomer({
        variables: {
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          address: formState.address,
        },
      });

      // clear form value
      setFormState({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
      props.setModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='flex-row justify-space-between'>
          <h3 className='mx-auto pl-5 text-header'>Add New Customer</h3>
          <button
            className='open-modal-btn'
            onClick={() => props.setModalVisible(false)}
          >
            <IoClose />
          </button>
        </div>

        <form className='flex-column' onSubmit={handleFormSubmit}>
          <input
            className='signup-form-input'
            placeholder='NAME'
            name='name'
            type='text'
            id='name'
            value={formState.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className='signup-form-input'
            placeholder='EMAIL'
            name='email'
            type='email'
            id='email'
            value={formState.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className='signup-form-input'
            placeholder='PHONE NUMBER'
            name='phone'
            type='tel'
            id='phone'
            value={formState.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className='signup-form-input'
            placeholder='ADDRESS'
            name='address'
            type='text'
            id='name'
            value={formState.address}
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

export default AddCustomerForm;

