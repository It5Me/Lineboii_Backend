const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodCategorySchema = new Schema({
    header: {
        type: String,
        required: [true, 'Please enter name header'],
        unique: true,
    },
    foods: {
        type: [mongoose.Types.ObjectId],
        uniqe: true,
    },
});

mongoose.model('foodcategory', foodCategorySchema);
