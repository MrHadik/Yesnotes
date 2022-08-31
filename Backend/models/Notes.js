const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    tag:{
        type:String,
        default: 'Generel'
    },
    date:{
        type:Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('notes',NotesSchema);