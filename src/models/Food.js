const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema({
    foodImageURL: {
        type: String,
    },
    title: {
        type: String,
        unique: true,
    },
    subtitle: {
        type: String,
        unique: true,
    },
    price: {
        type: Number,
    },
    additionalDetail: {
        type: String,
        default: 'รายละเอียดเพิ่มเติม',
    },
    amount: {
        type: Number,
        default: 1,
    },
    foodAdditions: {
        type: [mongoose.Types.ObjectId],
        unique: true,
    },
});

mongoose.model('food', foodSchema);
