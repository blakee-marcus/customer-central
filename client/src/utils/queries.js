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
        participants
      }
    }
  }
`;
export const QUERY_CUSTOMER = gql`
  query Query($id: ID!) {
    customer(_id: $id) {
      _id
      name
      email
      phone
      address
      customerSince
      notes {
        _id
        author
        noteBody
        createdAt
      }
      communicationHistory {
        _id
        type
        subject
        date
        notes
        participants
      }
      createdBy
      noteCount
      communicationCount
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
  query Me {
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
        notes {
          _id
          author
          noteBody
          createdAt
          writtenFor {
            _id
          }
        }
        communicationHistory {
          _id
          type
          subject
          date
          notes
          participants
        }
        createdBy
        noteCount
        communicationCount
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

export const NOTES_WRITTEN_BY = gql`
  query NotesWrittenBy($username: String) {
    notesWrittenBy(username: $username) {
      _id
      author
      noteBody
      createdAt
      writtenFor {
        _id
        name
      }
    }
  }
`;

export const COMMUNICATION_WRITTEN_BY = gql`
  query Query($participants: String) {
    communicationWrittenBy(participants: $participants) {
      _id
      type
      subject
      date
      notes
      participants
      writtenFor {
        _id
        name
      }
    }
  }
`;

