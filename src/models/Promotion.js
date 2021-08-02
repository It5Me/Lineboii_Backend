const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
    title: {
        type: String,
    },
    restaurantId: {
        type: mongoose.Types.ObjectId,
    },
});
mongoose.model('promotion', PromotionSchema);
