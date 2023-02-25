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
  mutation Mutation(
    $name: String!
    $email: String!
    $phone: String
    $address: String
  ) {
    addCustomer(name: $name, email: $email, phone: $phone, address: $address) {
      _id
    }
  }
`;

export const ADD_CUSTOMER_NOTE = gql`
  mutation Mutation($customerId: ID!, $noteBody: String!) {
    addCustomerNote(customerId: $customerId, noteBody: $noteBody) {
      _id
      author
      noteBody
      createdAt
    }
  }
`;

export const ADD_CUSTOMER_COMMUNICATION = gql`
  mutation Mutation($customerId: ID!, $type: String!, $subject: String!, $date: String, $notes: String) {
  addCustomerCommunication(customerId: $customerId, type: $type, subject: $subject, date: $date, notes: $notes) {
    _id
  }
}
`;

