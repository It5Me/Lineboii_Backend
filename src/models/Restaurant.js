const mongoose = require('mongoose');
const foodSetSchema = require('./Foodset');
// const FoodSet = mongoose.model('foodset');
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
        type: Date,
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
    foodset: [foodSetSchema],
});

mongoose.model('restaurant', restaurantSchema);
