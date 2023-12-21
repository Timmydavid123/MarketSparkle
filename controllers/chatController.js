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

        // Send the user's message to the vendor and get the vendor's response (for simplicity, simulate a delayed response)
        const vendorResponse = await simulateVendorResponse(message);

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

// Simulate a delayed vendor response (you can replace this with actual logic to communicate with the vendor)
const simulateVendorResponse = async (userMessage) => {
    try {
        // Simulate a delay (you can replace this with actual communication to the vendor)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate a vendor response based on the user's message
        return `Thanks for your inquiry about ${userMessage}. We will get back to you soon!`;
    } catch (error) {
        console.error('Error simulating vendor response:', error);
        throw error; // Rethrow the error to be caught in the main try-catch block
    }
};

module.exports = {
    sendMessage,
};
