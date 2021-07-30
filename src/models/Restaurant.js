const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Please provide a username '],
        unique: true,
    },
    isOfficial: {
        type: Boolean,
        require: true,
    },
    dailyCloseTime: {
        type: String,
        require: true,
    },
    dailyOpenTime: {
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
    foodset: {
        type: mongoose.Types.ObjectId,
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
