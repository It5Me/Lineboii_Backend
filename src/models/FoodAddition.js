const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuSchema = require('./Menu');
const foodAdditionSchema = new Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
        enum: ['choice', 'checkbox'],
        default: 'checkbox',
    },
    additionalDetail: {
        type: String,
    },
    amount: {
        type: Number,
        default: 1,
    },
    menuId: {
        type: mongoose.Types.ObjectId,
    },
});
mongoose.model('foodaddition', foodAdditionSchema);
