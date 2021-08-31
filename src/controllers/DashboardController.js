const mongoose = require('mongoose');

module.exports.promotion_get = async (req, res) => {
    try {
        res.send(promotionToday);
    } catch (error) {
        console.log(error);
    }
};
