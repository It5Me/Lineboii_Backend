const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodAdditionSchema = require('./FoodAddition');
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
    foodAddition: {
        type: mongoose.Types.ObjectId,
    },
});

mongoose.model('foodset', foodSetSchema);
// module.exports = foodSetSchema;
