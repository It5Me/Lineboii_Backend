const mongoose = require('mongoose');
const FoodCategory = mongoose.model('foodcategory');
const Food = mongoose.model('food');
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
module.exports.add_food_foodCategory = async (req, res) => {
    let exist = false;
    console.log('req.body', req.body);
    try {
        const currentFoodCategory = await FoodCategory.findById(req.params.id).populate({
            path: 'foods',
            model: 'food',
            select: 'title subtitle price',
        });
        // console.log('current', currentFoodCategory);
        if (currentFoodCategory) {
            currentFoodCategory.foods.forEach((food) => {
                if (req.body.title === String(food.title)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('foodcategory already exist');
            } else {
                const newFood = await Food.create(req.body);
                const foodCategory = await FoodCategory.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { foods: newFood._id } },
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
        res.status(400).send(error.message);
    }
};
module.exports.delete_foodCategory = async (req, res) => {
    try {
        const foodCategory = await FoodCategory.findById(req.params.id);
        if (foodCategory) {
            await FoodCategory.findOneAndDelete(req.params.id);
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
module.exports.edit_foodCategory = async (req, res) => {
    try {
        const getFoodCategory = await FoodCategory.findOne({ _id: req.params.id });
        console.log(getFoodCategory);
        if (getFoodCategory) {
            await FoodCategory.findByIdAndUpdate(getFoodCategory._id, req.body);
            return res.status(200).json({
                status: true,
                message: 'Updata FoodCategory Complete',
            });
        } else {
            res.status(400).send('Invalid FoodCategory');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
