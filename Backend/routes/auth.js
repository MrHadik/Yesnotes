const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');

router.post('/',[body('email','Enter Valid Email').isEmail(),body('passwd','Password Must be 5 Digit').isLength({ min: 5 })], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        passwd: req.body.passwd,
      }).then(user => res.json(user))
    
  })

module.exports = router