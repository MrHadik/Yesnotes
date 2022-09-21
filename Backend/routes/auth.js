const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { useInsertionEffect } = require('react');

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
        })
        const date = {user:{id:User.id}}
        const token = jwt.sign(date, 'shhhhh');
        res.json({token})
      });
    });
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
})

router.post('/login', [body('email', 'Enter Valid Email').isEmail(), body('passwd', 'enter password').isLength({ min: 1 })], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let ch = await User.findOne({ email: req.body.email });
    if (!ch) {
      return res.status(400).json({ error: "User Not Found" });
    }

    const passcom = await bcrypt.compare(req.body.passwd,User.passwd);

    if (!passcom) {
      return res.status(400).json({ error: "Worng Password" });
    }
    
    const date = {user:{id:User.id}}
    const token = jwt.sign(date, 'shhhhh');
    res.json({token})

  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
})

module.exports = router