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
        author: [User]
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
        createdBy: [User]
        noteCount: Int
        communicationCount: Int
    }

    type Communication {
        _id: ID
        type: String
        subject: String
        date: String
        notes: String
        participants: [User]
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
        addCustomer(name: String!, email: String!, phone: String, address: String): User
        addCustomerNote(customerId: ID!, noteBody: String!): Customer
        addCustomerCommunication(customerId: ID!, type: String!, date: String, notes: String): Customer
    }
`;

module.exports = typeDefs;