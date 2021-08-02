const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let amountlimit;
const PromotionSetSchema = new Schema({
    amountlimit: {
        type: Number,
    },
    promotionsId: {
        type: mongoose.Types.ObjectId,
    },
});

const Promotion = mongoose.model('promotion');
const promotion = new Promotion({
    title: 'สตรีทฟู้ดมีโปร ลดสูงสุด 60%',
    restaurantId: '610781ba10a6e950f4111c8e',
});
promotion.save();
mongoose.model('promotionset', PromotionSetSchema);
const PromotionSet = mongoose.model('promotionset');
const promotionset = new PromotionSet({
    amountlimit: Math.floor(Math.random() * 3) + 1,
    promotionsId: '610781ba10a6e950f4111c8e',
});
console.log('amount', amountlimit);
promotionset.save();
