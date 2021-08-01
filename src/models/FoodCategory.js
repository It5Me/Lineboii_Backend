const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodCategorySchema = new Schema({
    header: {
        type: String,
    },
    foodId: {
        type: mongoose.Types.ObjectId,
    },
});

mongoose.model('foodcategory', foodCategorySchema);
