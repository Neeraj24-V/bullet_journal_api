const mongoose = require('mongoose');

// This function makes a connection to the database when called.
const connectDB = (cb) => {
    try {
        const connect = mongoose.connect(process.env.MONGO_URI)
        console.log("Connection to the database successful!!");
        cb()
    } catch (err) {
        console.log(err.message)
        cb(err)
    }
}

module.exports = connectDB

