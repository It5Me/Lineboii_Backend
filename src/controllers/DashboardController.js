const mongoose = require('mongoose');
const PromotionSet = mongoose.model('promotionset');
const Promotion = mongoose.model('promotion');
module.exports.promotion_get = async (req, res) => {
    try {
        const getLimitPromotion = await PromotionSet.find({}, { amountlimit: 1 }, {});
        console.log('get', getLimitPromotion[0].amountlimit);
        console.log('beforedelete', getLimitPromotion[0]._id);
        const getLimit = getLimitPromotion[0].amountlimit;
        const getPromotion = await Promotion.find({}, { title: 1 }, { limit: getLimit });
        console.log('getPromotion', getPromotion);

        await PromotionSet.findByIdAndUpdate(
            getLimitPromotion[0]._id,
            { amountlimit: Math.floor(Math.random() * 3) + 1 },
            function (err, data) {
                console.log(data);
            }
        );
        res.send('end');
    } catch (error) {
        console.log(error);
    }
};
