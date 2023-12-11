// models/ChatMessage.js

const mongoose = require('mongoose');

// Define the schema for a chat message
const chatMessageSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    vendor_id: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        enum: ['user', 'vendor'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Create a Mongoose model based on the schema
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
