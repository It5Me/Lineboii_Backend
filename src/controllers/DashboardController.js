const mongoose = require('mongoose');
const PromotionSet = mongoose.model('promotionset');
const Promotion = mongoose.model('promotion');
module.exports.promotion_get = async (req, res) => {
    try {
        res.send(promotionToday);
    } catch (error) {
        console.log(error);
    }
};
