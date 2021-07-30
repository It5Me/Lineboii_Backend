const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
    },
    restaurants: {
        type: mongoose.Types.ObjectId,
    },
});
mongoose.model('brand', brandSchema);
