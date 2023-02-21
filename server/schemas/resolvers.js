/* eslint-disable no-underscore-dangle */
const { AuthenticationError } = require('apollo-server-express');
const { User, Customer } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('customers');

        return userData;
      }
      throw new AuthenticationError('Not Logged In');
    },
    customers: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Customer.find(params).sort({ createdAt: -1 });
    },
    customer: async (parent, { _id }) => Customer.findOne({ _id }),
    users: async () => User.find().select('-__v -password').populate('customers'),
    user: async (parent, { username }) => User.findOne({ username })
      .select('-__v -password')
      .populate('customers'),
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addCustomer: async (parent, args, context) => {
      if (context.user) {
        const customer = await Customer.create({
          ...args,
          createdBy: context.user._id,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { customers: customer._id } },
          { new: true },
        );

        return customer;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addCustomerNote: async (parent, { customerId, noteBody }, context) => {
      if (context.user) {
        const updatedCustomer = await Customer.findOneAndUpdate(
          { _id: customerId },
          {
            $push: {
              notes: {
                noteBody,
                author: context.user.username,
              },
            },
          },
          { new: true },
        );

        return updatedCustomer;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addCustomerCommunication: async (
      parent,
      {
        customerId, type, subject, notes,
      },
      context,
    ) => {
      if (context.user) {
        const updatedCustomer = await Customer.findOneAndUpdate(
          { _id: customerId },
          {
            $push: {
              communicationHistory: {
                type,
                subject,
                notes,
                participants: context.user.username,
              },
            },
          },
          { new: true },
        );

        return updatedCustomer;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
