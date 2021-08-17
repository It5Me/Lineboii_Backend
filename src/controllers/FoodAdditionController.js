const mongoose = require('mongoose');
const FoodAddition = mongoose.model('foodaddition');
module.exports.foodAddition_get = async (req, res) => {
    try {
        const currentFoodAddition = await FoodAddition.findById(req.params.id);
        res.status(200).send(currentFoodAddition);
    } catch (error) {
        console.log(error.message);
    }
};
module.exports.foodAddition_create = async (req, res) => {
    try {
        const newFoodAddition = await FoodAddition.create(req.body);
        res.status(200).send(newFoodAddition);
    } catch (error) {
        console.log(error.message);
    }
};
