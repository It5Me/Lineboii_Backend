const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodAdditionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
    },
    subtitle: {
        type: String,
        required: [true, 'Please enter subtitle'],
    },
    type: {
        type: String,
        enum: ['choice', 'checkbox'],
        default: 'checkbox',
    },
    menus: {
        type: [mongoose.Types.ObjectId],
        validate: [(v) => Array.isArray(v) && v.length > 0, 'Please enter at least one menu'],
        unique: true,
    },
});
mongoose.model('foodaddition', foodAdditionSchema);
