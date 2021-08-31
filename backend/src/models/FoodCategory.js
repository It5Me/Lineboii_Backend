const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurant = mongoose.model('restaurant');
const foodCategorySchema = new Schema({
    header: {
        type: String,
        required: [true, 'Please enter name'],
    },
    foods: {
        type: [mongoose.Types.ObjectId],
    },
});
foodCategorySchema.pre('findOneAndDelete', async function (next) {
    console.log('remove');
    console.log('this', this._conditions._id);
    const currentRestaurant = await Restaurant.findOneAndUpdate(
        { foodCategories: this._conditions._id },
        { $pull: { foodCategories: this._conditions._id } },
        { new: true }
    );
    console.log('currentRestaurant', currentRestaurant);
    next();
});

mongoose.model('foodcategory', foodCategorySchema);
