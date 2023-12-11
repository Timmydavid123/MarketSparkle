const mongoose = require('mongoose');
const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

const paymentSchema = new mongoose.Schema({
  transactionType: String,
  destinationAccountNumber: String,
  destinationBank: String,
  destinationAccountName: String,
  timestamp: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

async function savePaymentToDatabase(paymentData) {
  const payment = new Payment(paymentData);
  return payment.save();
}

async function processTransfer(destinationAccountNumber, destinationBank, destinationAccountName) {
  try {
    // Perform transfer logic (you can customize this based on your use case)
    // For example, you might use a third-party API to initiate the transfer
    // Replace "AccountNumber," "Bank," and "AccountName" with the actual variables
    const transferResponse = await axios.post('https://some-transfer-api.com/transfer', {
        destinationAccountNumbe: destinationAccountNumber,
        destinationBank: destinationBank,
        destinationAccountName: destinationAccountName,
    });

    // Save payment information to the database
    await savePaymentToDatabase({
      transactionType: 'transfer',
      destinationAccountNumber: destinationAccountNumber,
      destinationBank: destinationBank,
      destinationAccountName: destinationAccountName,
    });

    return {
      success: true,
      message: 'Transfer successful',
      destinationAccountNumber: destinationAccountNumber,
      destinationBank: destinationBank,
      destinationAccountName: destinationAccountName,
    };
  } catch (error) {
    console.error('Error processing transfer:', error.message);
    throw error;
  }
}

async function processCardPayment(cardDetails) {
  try {
    // Use the Stripe API to tokenize the card
    const token = await stripe.tokens.create({
      card: {
        number: cardDetails.cardNumber,
        exp_month: cardDetails.cardExpiryMonth,
        exp_year: cardDetails.cardExpiryYear,
        cvc: cardDetails.cvv,
      },
    });

    // Use the token for further processing
    const response = await stripe.charges.create({
      amount: 1000, // Example amount in cents
      currency: 'usd',
      source: token.id,
    });

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
