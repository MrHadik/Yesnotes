const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/user';

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURL,()=>{
            console.log("mongos connet Done");
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToMongo;