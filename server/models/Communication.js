const { Schema, model } = require('mongoose');

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
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  participants: {
    type: String,
    required: true,
  },
  writtenFor: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
});

const Communication = model('Communication', communicationSchema);

module.exports = Communication;
