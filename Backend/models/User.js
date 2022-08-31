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

  module.exports = mongoose.model('user',UserSchema);