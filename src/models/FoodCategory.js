const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodCategorySchema = new Schema({
    header: {
        type: String,
        required: [true, 'Please enter name'],
    },
    foods: {
        type: [mongoose.Types.ObjectId],
        validate: [(v) => Array.isArray(v) && v.length > 0, 'Please enter at least one food'],
        uniqe: true,
    },
});

mongoose.model('foodcategory', foodCategorySchema);
