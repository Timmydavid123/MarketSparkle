const ChatMessage = require('../models/ChatMessage');

const sendMessage = async (req, res) => {
    try {
        const { user_id, vendor_id, message } = req.body;

        // Save the user's message to the database
        const userMessage = new ChatMessage({
            user_id,
            vendor_id,
            sender: 'user',
            message,
        });
        await userMessage.save();

        // In a real app, there would be logic here to send the user's message to the vendor
        // and get the vendor's response.

        // For simplicity, let's assume the vendor responds immediately.
        const vendorResponse = 'Thanks for your message! How can I assist you?';

        // Save the vendor's response to the database
        const vendorMessage = new ChatMessage({
            user_id,
            vendor_id,
            sender: 'vendor',
            message: vendorResponse,
        });
        await vendorMessage.save();

        // Respond to the client with the success status
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    sendMessage,
};