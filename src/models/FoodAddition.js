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
    menuId: {
        type: mongoose.Types.ObjectId,
    },
});
mongoose.model('foodaddition', foodAdditionSchema);
