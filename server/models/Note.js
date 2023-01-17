const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
