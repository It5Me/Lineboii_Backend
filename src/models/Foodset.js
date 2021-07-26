const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const FoodAddition = require('./FoodAddition');
const foodSetSchema = new Schema({
    foodImageURL: {
        type: String,
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    // foodAddition: [FoodAddition.foodAdditionSchema],
});

mongoose.model('foodset', foodSetSchema);
module.exports = foodSetSchema;
