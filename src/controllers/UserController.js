const mongoose = require('mongoose');
// const User = mongoose.model('user');
const userSchema = require('../models/User');
// const profile = require('../models/Profile');
module.exports.user_post = (req, res, next) => {
    console.log('req user post', req.body);

    res.send('postuser');
};
module.exports.user_get = async (req, res, next) => {
    console.log('req', req.body.user);

    res.send('getuser');
};
