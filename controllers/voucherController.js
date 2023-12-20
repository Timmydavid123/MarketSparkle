// voucherController.js
const Voucher = require('../models/voucher');
const { validationResult } = require('express-validator');

const voucherController = {
  generateVoucher: async (req, res) => {
    try {
      const { code, discountPercentage, expirationDate } = req.body;

      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const voucher = await Voucher.create({
        code,
        discountPercentage,
        expirationDate,
      });

      res.status(201).json(voucher);
    } catch (error) {
      console.error('Error generating voucher:', error);
      res.status(500).json({ message: 'Internal Server Error generating voucher' });
    }
  },

  validateVoucher: async (req, res) => {
    try {
      const { voucherCode } = req.body;

      const voucher = await Voucher.findOne({ code: voucherCode });

      if (!voucher) {
        return res.status(404).json({ message: 'Invalid voucher code' });
      }

      // Additional validation logic (e.g., check expiration date)

      res.json({ message: 'Voucher code is valid', discountPercentage: voucher.discountPercentage });
    } catch (error) {
      console.error('Error validating voucher:', error);
      res.status(500).json({ message: 'Internal Server Error validating voucher' });
    }
  },
};

module.exports = voucherController;
