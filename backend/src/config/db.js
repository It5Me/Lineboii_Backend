const mongoose = require('mongoose');
const config = require('../config');
const connectDB = async () => {
    await mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    console.log('Connect to database');
};

module.exports = connectDB;
