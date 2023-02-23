const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  noteBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Note = model('Note', noteSchema);

module.exports = Note;
