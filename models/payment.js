// payment.js

const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

const paymentSchema = new mongoose.Schema({
  transactionType: String,
  sourceAccountNumber: String,
  destinationAccountNumber: String,
  timestamp: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

async function savePaymentToDatabase(paymentData) {
  const payment = new Payment(paymentData);
  return payment.save();
}

async function processTransfer(sourceAccountNumber, destinationAccountNumber) {
  // Handle transfer logic (no changes for this example)
  return {
    success: true,
    message: 'Transfer successful',
    sourceAccountNumber: sourceAccountNumber,
    destinationAccountNumber: destinationAccountNumber,
  };
}

async function processCardPayment(reference) {
  try {
    // Validate the payment using Flutterwave API
    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${reference}/verify`, {
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
      },
    });

    const verificationData = response.data.data;

    // Check if the payment was successful
    if (verificationData.status === 'successful') {
      // Save payment information to the database
      await savePaymentToDatabase({
        transactionType: 'card',
        sourceAccountNumber: 'N/A',
        destinationAccountNumber: 'N/A',
      });

      return {
        success: true,
        message: 'Card payment successful',
      };
    } else {
      throw new Error('Payment verification failed');
    }
  } catch (error) {
    console.error('Error processing card payment:', error.message);
    throw error;
  }
}

async function processFlutterwavePayment(amount, email, phoneNumber) {
  try {
    // Generate a random account number for the user
    const accountNumber = generateAccountNumber();

    const response = await axios.post(
      'https://api.flutterwave.com/v3/charges?type=card',
      {
        tx_ref: 'unique_transaction_reference',
        amount: amount,
        currency: 'NGN',
        redirect_url: 'https://your-redirect-url.com',
        payment_type: 'card',
        customer: {
          email: email,
          phone_number: phoneNumber,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data.data;

    return {
      success: true,
      message: 'Payment initiated successfully',
      paymentLink: data.link,
      accountNumber: accountNumber,
    };
  } catch (error) {
    console.error('Error initiating payment:', error.message);
    throw error;
  }
}

function generateAccountNumber() {
  return Math.floor(Math.random() * 1000000000).toString();
}

module.exports = {
  processTransfer: processTransfer,
  processCardPayment: processCardPayment,
  processFlutterwavePayment: processFlutterwavePayment,
};
