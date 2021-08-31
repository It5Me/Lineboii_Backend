const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FoodAddition = mongoose.model('foodaddition');
const menuSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
    },
});
menuSchema.pre('findOneAndDelete', async function (next) {
    console.log('remove');
    console.log('this', this._conditions._id);
    const currentFoodAddition = await FoodAddition.findOneAndUpdate(
        { menus: this._conditions._id },
        { $pull: { menus: this._conditions._id } },
        { new: true }
    );
    console.log('currentFoodAddition', currentFoodAddition);
    next();
});
mongoose.model('menu', menuSchema);
