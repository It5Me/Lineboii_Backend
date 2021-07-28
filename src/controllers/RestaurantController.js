const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const Foodset = mongoose.model('foodset');
module.exports.data_get = (req, res) => {
    console.log(req.body);
    res.send('get');
};
module.exports.data_post = (req, res) => {
    console.log(req.body);
    res.send('post');
};
