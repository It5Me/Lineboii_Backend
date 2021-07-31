const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema({
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

mongoose.model('food', foodSchema);
