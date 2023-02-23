const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const communicationSchema = new Schema({
  type: {
    type: String,
    enum: {
      values: ['email', 'phone', 'in person', 'video chat'],
      message: 'Communication type must be email, phone or meeting!',
    },
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  notes: {
    type: String,
    required: true,
  },
  participants: {
    type: String,
    required: true,
  },
});

const Communication = model('Communication', communicationSchema);

module.exports = Communication;
