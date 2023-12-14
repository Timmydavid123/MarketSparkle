const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const axios = require('axios');
const extractUserId = require('../middleware/extractUserId');

// Load environment variables
require('dotenv').config();

// Function to determine card type based on the card number
const getCardType = (cardNumber) => {
  // Replace this with a more sophisticated implementation to determine card type
  if (cardNumber.startsWith('5')) {
    return 'mastercard';
  } else if (cardNumber.startsWith('4')) {
    return 'visa';
  } else if (cardNumber.startsWith('506') || cardNumber.startsWith('650')) {
    return 'verve';
  }
  return 'unknown';
};

// Route for processing a Flutterwave payment
router.post('/make-flutterwave-payment', extractUserId, async (req, res) => {
  const { cardNumber, cardHolderName, expiryDate, cvv, amount, email, phoneNumber } = req.body;

  try {
    // Save payment details to the database
    const newPayment = new Payment({
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
    });
    await newPayment.save();

    // Simulate different scenarios based on conditions
    let flutterwaveResponse;

    const allowedCardTypes = ['mastercard', 'visa', 'verve'];

    // Extract card type from the card number
    const cardType = getCardType(cardNumber);

    if (allowedCardTypes.includes(cardType)) {
      // Make a request to Flutterwave API for processing the payment
      flutterwaveResponse = await axios.post(
        'https://api.flutterwave.com/v3/charges?type=card',
        {
          tx_ref: Date.now(),
          amount,
          currency: 'NGN',
          payment_type: 'card',
          email,
          phone_number: phoneNumber,
          // Add other necessary parameters for Flutterwave payment
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          },
        }
      );
    } else {
      // Simulate unsupported card type
      flutterwaveResponse = { data: { status: 'failure', message: 'Unsupported card type' } };
    }

    // Process the flutterwaveResponse as needed

    res.status(200).json({ success: true, message: 'Flutterwave payment successful', flutterwaveResponse: flutterwaveResponse.data });
  } catch (error) {
    console.error('Error processing Flutterwave payment:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
