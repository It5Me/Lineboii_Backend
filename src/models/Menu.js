const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    status: {
        type: Boolean,
    },
});

mongoose.model('menu', menuSchema);
module.exports = menuSchema;
