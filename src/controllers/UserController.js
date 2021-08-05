const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports.user_post = (req, res, next) => {
    console.log('req user post', req.body);

    res.send('postuser');
};
module.exports.user_get = async (req, res, next) => {
    console.log('req', req.user);

    res.send('getuser');
};
