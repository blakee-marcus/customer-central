import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CUSTOMER = gql`
  mutation AddCustomer(
    $name: String!
    $email: String!
    $phone: String
    $address: String
  ) {
    addCustomer(name: $name, email: $email, phone: $phone, address: $address) {
      _id
      name
      email
      phone
      address
      customerSince
      noteCount
      communicationCount
      communicationHistory {
        _id
      }
      notes {
        _id
      }
      createdBy {
        _id
        username
      }
    }
  }
`;

export const ADD_CUSTOMER_NOTE = gql`
  mutation Mutation($customerId: ID!, $noteBody: String!) {
    addCustomerNote(customerId: $customerId, noteBody: $noteBody) {
      _id
      name
      email
      phone
      address
      customerSince
      notes {
        _id
        createdAt
        noteBody
        author {
          _id
          username
        }
      }
      createdBy {
        _id
        username
      }
      noteCount
    }
  }
`;
