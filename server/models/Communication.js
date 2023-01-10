const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const communicationSchema = new Schema(
    {
        type: {
            type: String,
            enum: {
                values: ['email', 'phone', 'meeting'],
                message: 'Communication type must be email, phone or meeting!'
            },
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
            get: timestamp => dateFormat(timestamp)
        },
        notes: {
            type: String,
            required: true
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
);

const Communication = model('Communication', communicationSchema);

module.exports = Communication;