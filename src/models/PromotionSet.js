const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionSetSchema = new Schema({
    selectPromotion: {
        type: mongoose.Types.ObjectId,
    },
    active: {
        type: Date,
        default: Date.now(),
    },
    expireIn: {
        type: Date,
        default: Date.now() + 7 * 24 * 60 * (60 * 1000),
    },
    disable: {
        type: Boolean,
        default: false,
    },
});
mongoose.model('promotionset', PromotionSetSchema);
