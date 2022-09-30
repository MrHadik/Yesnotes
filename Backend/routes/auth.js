const express = require("express");
const User = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { useInsertionEffect } = require("react");
const connectToMongo = require("../db");
const fachauser = require('../middleware/fachauser')

router.post(
  "/creatuser",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("passwd", "Password Must be 5 Digit").isLength({ min: 5 }),
  ],
  async (req, res) => {
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
        function o(userid) {
          // console.log(userid)
          const date = { userid };
          const token = jwt.sign(date, "H@rd!k#$110");
          res.json({ token });
        }
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
          // Store hash in your password DB.
          user = User.create({
            name: req.body.name,
            email: req.body.email,
            passwd: hash,
          }).then((user) => o(user._id)); //functio for data sand to user
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: error });
    }

    // try {
    //   var datas = await User.find({email: req.body.email });
    //   console.log(datas)
    //   const psss = datas[0].id;
    //   const date = { user: { id: psss } };
    //   console.log({ user: { id: psss } });
    //   const token = jwt.sign(date, "shhhhh");
    //   res.json({ token });
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).json({ errors: error });
    // }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("passwd", "enter password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let ch = await User.findOne({ email: req.body.email });
      if (!ch) {
        return res.status(400).json({ error: "User Not Found" });
      }

      var data = await User.find({ email: req.body.email });
      const pss = data[0].passwd;

      const passcom = await bcrypt.compare(req.body.passwd, pss);

      if (!passcom) {
        return res.status(400).json({ error: "Wrong Password" });
      }

      const date = { user: { id: data[0].id } };
      const token = jwt.sign(date, "H@rd!k#$110");
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

router.post("/getdata",fachauser, async (req, res) => {
  try {
    usid = req.user.id;
    const user = await User.findById(usid).select('-passwd')
    res.status(200).sand(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
