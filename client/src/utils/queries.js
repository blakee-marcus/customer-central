import { gql } from '@apollo/client';
export const QUERY_CUSTOMERS = gql`
  query customers($username: String) {
    customers(username: $username) {
      _id
      name
      email
      phone
      address
      customerSince
      noteCount
      notes {
        _id
        author
        noteBody
        createdAt
      }
      communicationCount
      communicationHistory {
        _id
        type
        subject
        date
        notes
        participants {
          _id
          username
        }
      }
    }
  }
`;
export const QUERY_CUSTOMER = gql`
  query customer($id: ID!) {
    customer(_id: $id) {
      _id
      name
      email
      phone
      address
      customerSince
      noteCount
      notes {
        _id
        author
        noteBody
        createdAt
      }
      communicationCount
      communicationHistory {
        _id
        type
        subject
        date
        notes
        participants {
          _id
          username
        }
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($username: String) {
    user(username: $username) {
      _id
      username
      email
      customerCount
      customers {
        _id
        name
        email
        phone
        address
        customerSince
        noteCount
        communicationCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      customerCount
      customers {
        _id
        name
        email
        phone
        address
        customerSince
        noteCount
        notes {
          _id
          author {
            username
          }
          noteBody
          createdAt
        }
        communicationCount
        communicationHistory {
          _id
          type
          subject
          date
          notes
          participants {
            _id
            username
          }
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      customerCount
    }
  }
`;
