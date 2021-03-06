const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Please enter name restaurant'],
        unique: true,
    },
    timeDelivery: {
        type: String,
    },
    deliveryPrice: {
        type: Number,
    },
    announcement: {
        type: String,
    },
    supportedTypes: {
        type: String,
        enum: ['freeDelivery', 'allowCreditCard', 'promotion'],
    },
    isOfficial: {
        type: Boolean,
        require: true,
    },
    dailyOpenTime: {
        type: String,
        require: true,
    },
    dailyCloseTime: {
        type: String,
        require: true,
    },
    isPickup: {
        type: Boolean,
        require: true,
    },
    distance: {
        type: Number,
        require: true,
    },
    restaurantImageURL: {
        type: String,
        require: true,
    },
    foodCategories: {
        type: [mongoose.Types.ObjectId],
    },
    myScore: {
        type: Number,
        require: true,
    },
    overallScore: {
        type: Number,
        require: true,
    },
});

mongoose.model('restaurant', restaurantSchema);
