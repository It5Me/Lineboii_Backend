const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodAdditionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter name foodaddition'],
    },
    subtitle: {
        type: String,
    },
    type: {
        type: String,
        enum: ['choice', 'checkbox'],
        default: 'checkbox',
    },
    menus: {
        type: [mongoose.Types.ObjectId],
    },
});
mongoose.model('foodaddition', foodAdditionSchema);
