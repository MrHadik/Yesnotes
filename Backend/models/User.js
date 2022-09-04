const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    passwd:{
        type:String,
        require: true
    },
    date:{
        type:Date,
        default: Date.now
    }
  });
  const User = mongoose.model('User',UserSchema);
  module.exports = User;