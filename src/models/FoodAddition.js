const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Food = mongoose.model('food');
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
foodAdditionSchema.pre('findOneAndDelete', async function (next) {
    console.log('remove');
    console.log('this', this._conditions._id);
    const currentFood = await Food.findOneAndUpdate(
        { foodAdditions: this._conditions._id },
        { $pull: { foodAdditions: this._conditions._id } },
        { new: true }
    );
    console.log('currentFood', currentFood);
    next();
});
mongoose.model('foodaddition', foodAdditionSchema);
