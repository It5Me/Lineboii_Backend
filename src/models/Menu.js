const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    price: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
    },
});

mongoose.model('menu', menuSchema);
