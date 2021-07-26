const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const Foodset = mongoose.model('foodset');
module.exports.data_get = (req, res) => {
    res.send(req.body);
};
