const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    address: String,
    customerSince: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
    communicationHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Communication',
      },
    ],
    createdBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

customerSchema.virtual('noteCount').get(function () {
  return this.notes.length;
});

customerSchema.virtual('communicationCount').get(function () {
  return this.communicationHistory.length;
});

const Customer = model('Customer', customerSchema);

module.exports = Customer;
