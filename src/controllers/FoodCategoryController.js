const mongoose = require('mongoose');
const FoodCategory = mongoose.model('foodcategory');

module.exports.foodCategory_get = async (req, res) => {
    try {
        const currentFoodCategory = await FoodCategory.findById(req.params.id);
        return res.status(200).send(currentFoodCategory);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.foodCategory_create = async (req, res) => {
    console.log(req.body);
    try {
        const newFoodCategory = await FoodCategory.create(req.body);
        return res.status(200).send(newFoodCategory);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.add_foodCategory_restaurant = async (req, res) => {
    let exist = false;
    try {
        const currentFoodCategory = await FoodCategory.findById(req.params.id);
        // console.log('current', currentFoodCategory);
        if (currentFoodCategory) {
            currentFoodCategory.foods.map((value) => {
                if (req.body.food === String(value)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('foodcategory already exist');
            } else {
                const foodCategory = await FoodCategory.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { foods: req.body.food } },
                    { new: true }
                ).populate({
                    path: 'foods',
                    model: 'food',
                    select: 'foodImageURL title subtitle price',
                });
                res.status(200).send({ data: foodCategory, message: 'update foodaddition in food' });
            }
        } else {
            res.status(400).send('Invalid food');
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports.delete_food = async (req, res) => {
    try {
        const foodCategory = await FoodCategory.findById(req.params.id);
        if (foodCategory) {
            await FoodCategory.findByIdAndRemove(req.params.id);
            res.status(200).send({
                status: true,
                message: 'delete foodcategory',
            });
        } else {
            res.status(400).send({ status: false, message: 'Invalid foodcategory' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
