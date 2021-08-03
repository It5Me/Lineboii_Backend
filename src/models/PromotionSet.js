const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let amountlimit;
const PromotionSetSchema = new Schema({
    amountlimit: {
        type: Number,
    },
    created: {
        type: Date,
    },
    expireIn: {
        type: Date,
    },
});

// const Promotion = mongoose.model('promotion');
// const promotion = new Promotion({
//     title: 'สตรีทฟู้ดมีโปร ลดสูงสุด 60%',
//     restaurantId: '610781ba10a6e950f4111c8e',
// });
// promotion.save();
// const PromotionSet = mongoose.model('promotionset',PromotionSetSchema);
// const promotionset = new PromotionSet({
//     amountlimit: Math.floor(Math.random() * 3) + 1,
//     created: Date.now(),
// });
// console.log('amount', amountlimit);
// promotionset.save();

mongoose.model('promotionset', PromotionSetSchema);
