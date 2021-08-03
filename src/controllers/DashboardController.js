const mongoose = require('mongoose');
const PromotionSet = mongoose.model('promotionset');
const Promotion = mongoose.model('promotion');
module.exports.promotion_get = async (req, res) => {
    try {
        const getLimitPromotion = await PromotionSet.find({}, { created: 1, expireIn: 1 }, {});
        console.log('getDateCreate', getLimitPromotion[0].created);
        console.log('getDateExpire', getLimitPromotion[0].expireIn);
        console.log('beforedelete', getLimitPromotion[0]._id);
        console.log(typeof getLimitPromotion[0].created);
        console.log(typeof getLimitPromotion[0].expireIn);

        const createdDate = new Date(getLimitPromotion[0].created);
        const expireInDate = new Date(getLimitPromotion[0].expireIn);

        if (getLimitPromotion[0].created === undefined) {
            console.log('createNewDate');
            PromotionSet.created = Date.now();
            console.log('Time create', PromotionSet.created);
            PromotionSet.expireIn = Date.now() + 7 * 24 * 60 * (60 * 1000);
            console.log('Time expire', PromotionSet.expireIn);
            await PromotionSet.findByIdAndUpdate(
                getLimitPromotion[0]._id,
                { amountlimit: Math.floor(Math.random() * 3) + 2, created: PromotionSet.created, expireIn: PromotionSet.expireIn },
                function (err, data) {
                    console.log(data);
                }
            );
        } else {
            if (createdDate > expireInDate) {
                console.log('createDate');
                PromotionSet.created = Date.now();
                console.log('Time create', PromotionSet.created);
                PromotionSet.expireIn = Date.now() + 7 * 24 * 60 * (60 * 1000);
                console.log('Time expire', PromotionSet.expireIn);
                await PromotionSet.findByIdAndUpdate(
                    getLimitPromotion[0]._id,
                    { amountlimit: Math.floor(Math.random() * 3) + 2, created: PromotionSet.created, expireIn: PromotionSet.expireIn },
                    function (err, data) {
                        console.log(data);
                    }
                );
            }
            const getAmouutLimit = await PromotionSet.find({}, { amountlimit: 1 }, {});
            const getLimit = getAmouutLimit[0].amountlimit;
            console.log('getLimit', getLimit);
            const getPromotion = await Promotion.find({}, { title: 1 }, { limit: getLimit }).populate({
                path: 'restaurantId',
                model: 'restaurant',
                select: 'name',
            });
            console.log('getPromotion', getPromotion);
        }

        res.send('end');
    } catch (error) {
        console.log(error);
    }
};
