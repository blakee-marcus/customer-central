const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    customerCount: Int
    customers: [Customer]
  }

  type Note {
    _id: ID
    author: String
    noteBody: String
    createdAt: String
  }

  type Customer {
    _id: ID
    name: String
    email: String
    phone: String
    address: String
    customerSince: String
    notes: [Note]
    communicationHistory: [Communication]
    createdBy: String
    noteCount: Int
    communicationCount: Int
  }

  type Communication {
    _id: ID
    type: String
    subject: String
    date: String
    notes: String
    participants: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String): User
    customers(username: String): [Customer]
    customer(_id: ID!): Customer
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCustomer(
      name: String!
      email: String!
      phone: String
      address: String
    ): Customer
    addCustomerNote(customerId: ID!, noteBody: String!): Note
    addCustomerCommunication(
      customerId: ID!
      type: String!
      subject: String!
      date: String
      notes: String
    ): Communication
  }
`;

module.exports = typeDefs;
