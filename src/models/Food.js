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
    price: {
        type: Number,
    },
    foodAdditionId: {
        type: mongoose.Types.ObjectId,
    },
});

mongoose.model('food', foodSchema);
