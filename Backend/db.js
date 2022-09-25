// const mongoose = require('mongoose');
// const mongoURL = 'mongodb://localhost:27017/user';

// const connectToMongo = () => {
//     try {
//         mongoose.connect(mongoURL,()=>{
//             console.log("mongos connet Done");
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = connectToMongo;

// const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;
// const connectToMongo = () => {
// //   Connect MongoDB at default port 27017.
//   mongoose.connect(
//     "mongodb://localhost:27017/user",
//     {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     },
//     (err) => {
//       if (!err) {
//         console.log("MongoDB Connection Succeeded.");
//       } else {
//         console.log("Error in DB connection: " + err);
//       }
//     }
//   );

// const URI = 'mongodb://localhost:27017/user';
// mongoose.connect(URI, { useUnifiedTopology: true } 
// );

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// } )
  
// };
// module.exports = connectToMongo;


// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect('mongodb://localhost:27017/user', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
//     } catch (err) {
//         console.log(`Error: ${err.message}`.red);
//         process.exit(1);
//     }

// }


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectToMongo = async () => {
// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/yesnotes', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
}

module.exports = connectToMongo;