import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCustomerCommunicationForm from './index.js';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_CUSTOMER_COMMUNICATION } from '../../utils/mutations';
 
const mocks = [
  {
    request: {
      query: ADD_CUSTOMER_COMMUNICATION,
      variables: {
        customerId: '1',
        type: 'email',
        subject: 'test subject',
        date: '2023-02-25',
        notes: 'test notes',
      },
    },
    result: {
      data: {
        addCustomerCommunication: {
          _id: '1',
          customerId: '1',
          type: 'email',
          subject: 'test subject',
          date: '2023-02-25',
          notes: 'test notes',
        },
      },
    },
  },
];

describe('AddCustomerCommunicationForm', () => {
  it('renders form elements', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddCustomerCommunicationForm customerId="1" setCommunicationModalVisible={() => {}} />
      </MockedProvider>
    );
    expect(screen.getByText('Add New Communication:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MEETING TYPE')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('SUBJECT')).toBeInTheDocument();
    expect(screen.getByLabelText('date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('NOTES')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddCustomerCommunicationForm customerId="1" setCommunicationModalVisible={() => {}} />
      </MockedProvider>
    );

    // Fill out form fields
    fireEvent.change(screen.getByLabelText('Meeting Type'), { target: { value: 'email' } });
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'test subject' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-02-25' } });
    fireEvent.change(screen.getByLabelText('Notes'), { target: { value: 'test notes' } });

    fireEvent.blur(screen.getByLabelText('Meeting Type'));
    expect(await screen.findByText('')).not.toBeVisible();

    fireEvent.blur(screen.getByLabelText('Subject'));
    expect(await screen.findByText('')).not.toBeVisible();

    fireEvent.blur(screen.getByLabelText('Date'));
    expect(await screen.findByText('')).not.toBeVisible();

    fireEvent.blur(screen.getByLabelText('Notes'));
    expect(await screen.findByText('')).not.toBeVisible();

    fireEvent.change(screen.getByLabelText('Meeting Type'), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText('Meeting Type'));
    expect(await screen.findByText('Please Choose a Meeting Type')).toBeVisible();

    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText('Subject'));
    expect(await screen.findByText('Please Enter a Subject Line')).toBeVisible();

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText('Date'));
    expect(await screen.findByText('Please Enter a Meeting Date')).toBeVisible();

    fireEvent.change(screen.getByLabelText('Notes'), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText('Notes'));
    expect(await screen.findByText('Please Enter Notes')).toBeVisible();
  });
});
