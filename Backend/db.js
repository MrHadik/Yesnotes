const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/user';

const connectToMongo = () => {
    mongoose.connect(mongoURL,()=>{
        console.log("mongos connet Done");
    })
}

module.exports = connectToMongo;