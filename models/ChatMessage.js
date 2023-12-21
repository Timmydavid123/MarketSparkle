const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  vendor_id: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Add this line for the timestamp
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
