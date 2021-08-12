const mongoose = require('mongoose');
const FoodAddition = mongoose.model('foodaddition');
const Restaurant = mongoose.model('restaurant');
const FoodCategory = mongoose.model('foodcategory');
module.exports.foodCategory_create = async (req, res) => {
    const newfoodId = req.body.foodId ? req.body.foodId : null;
    let newFoodCategory = '';
    try {
        if (newfoodId) {
            newFoodCategory = new FoodCategory({
                header: req.body.header,
                foodId: [newfoodId],
            });
        } else {
            newFoodCategory = new FoodCategory({
                header: req.body.header,
            });
        }
        await newFoodCategory.save();
        res.status(200).send(newFoodCategory);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
};
