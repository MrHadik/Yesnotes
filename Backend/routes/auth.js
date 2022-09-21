const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.post('/creatuser', [body('email', 'Enter Valid Email').isEmail(), body('passwd', 'Password Must be 5 Digit').isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let ch = await User.findOne({ email: req.body.email });

  if (ch) {
    return res.status(400).json({ error: "User Alredy Registerd" });
  }

  try {
    const saltRounds = 10;
    const myPlaintextPassword = req.body.passwd;
    await bcrypt.genSalt(saltRounds, function (err, salt) {
      // console.log(salt);
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // Store hash in your password DB.
        user = User.create({
          name: req.body.name,
          email: req.body.email,
          passwd: hash
        }).then(user => res.json(user))
      });
    });
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
})

module.exports = router