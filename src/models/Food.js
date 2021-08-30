const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FoodCategory = mongoose.model('foodcategory');
const foodSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter name food'],
    },
    subtitle: {
        type: String,
    },
    foodImageURL: {
        type: String,
        required: [true, 'Please enter food image url'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter food price'],
    },
    additionalDetail: {
        type: String,
        default: 'รายละเอียดเพิ่มเติม',
    },
    amount: {
        type: Number,
        default: 1,
    },
    foodAdditions: {
        type: [mongoose.Types.ObjectId],
    },
});
foodAdditionSchema.pre('findOneAndDelete', async function (next) {
    console.log('remove');
    console.log('this', this._conditions._id);
    const currentFoodCategory = await FoodCategory.findOneAndUpdate(
        { foodAdditions: this._conditions._id },
        { $pull: { foodAdditions: this._conditions._id } },
        { new: true }
    );
    console.log('currentFood', currentFoodCategory);
    next();
});

mongoose.model('food', foodSchema);
