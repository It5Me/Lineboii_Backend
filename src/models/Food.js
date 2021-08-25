const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter name food'],
    },
    subtitle: {
        type: String,
    },
    foodImageURL: {
        type: String,
        required: [true, 'Please enter food image url'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter food price'],
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
        validate: [(v) => Array.isArray(v) && v.length > 0, 'Please enter at least one foodaddition'],
        unique: true,
    },
});

mongoose.model('food', foodSchema);
