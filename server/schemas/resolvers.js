/* eslint-disable no-underscore-dangle */
const { AuthenticationError } = require('apollo-server-express');
const {
  User, Customer, Note, Communication,
} = require('../models');
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
    customer: async (parent, { _id }) => {
      const customer = await Customer.findOne({ _id }).populate({
        path: 'notes',
        options: { sort: { createdAt: -1 } },
      }).populate({
        path: 'communicationHistory',
        options: { sort: { date: -1 } },
      });
      return customer;
    },
    users: async () => User.find().select('-__v -password').populate('customers'),
    user: async (parent, { username }) => User.findOne({ username }).select('-__v -password').populate('customers'),
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
          createdBy: context.user.username,
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
    addCustomerNote: async (parent, args, context) => {
      if (context.user) {
        const note = await Note.create({
          ...args,
          author: context.user.username,
        });
        await Customer.findByIdAndUpdate(
          { _id: args.customerId },
          {
            $push: {
              notes: note._id,
            },
          },
          { new: true },
        );

        return note;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addCustomerCommunication: async (parent, args, context) => {
      if (context.user) {
        const communication = await Communication.create({
          ...args,
          participants: context.user.username,
        });
        await Customer.findByIdAndUpdate(
          { _id: args.customerId },
          {
            $push: {
              communicationHistory: communication._id,
            },
          },
          { new: true },
        );
        return communication;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
