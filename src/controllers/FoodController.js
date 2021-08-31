const mongoose = require('mongoose');
const Food = mongoose.model('food');
const FoodAddition = mongoose.model('foodaddition');
module.exports.food_get = async (req, res) => {
    try {
        const currentFood = await Food.findById(req.params.id);
        return res.status(200).send(currentFood);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.food_create = async (req, res) => {
    try {
        const newFood = await Food.create(req.body);
        return res.status(200).send(newFood);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.add_foodaddition_food = async (req, res) => {
    let exist = false;
    console.log('req.body', req.body);
    try {
        const currentFood = await Food.findById(req.params.id).populate({
            path: 'foodAdditions',
            model: 'foodaddition',
            select: 'title subtitle',
        });
        console.log('currentFood', currentFood);
        if (currentFood) {
            currentFood.foodAdditions.forEach((foodaddition) => {
                console.log('foodaddition', foodaddition);
                if (req.body.title === String(foodaddition.title)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('foodaddition already exist');
            } else {
                const newFoodAddition = await FoodAddition.create(req.body);
                const food = await Food.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { foodAdditions: newFoodAddition._id } },
                    { new: true }
                ).populate({
                    path: 'foodAdditions',
                    model: 'foodaddition',
                    select: 'title subtitle',
                });
                res.status(200).send({ data: food, message: 'update foodaddition in food' });
            }
        } else {
            res.status(400).send('Invalid food');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};

module.exports.edit_food = async (req, res) => {
    try {
        const getFood = await Food.findOne({ _id: req.params.id });
        console.log(getFood);
        if (getFood) {
            await Food.findByIdAndUpdate(getFood._id, req.body);
            return res.status(200).json({
                status: true,
                message: 'Updata Food Complete',
            });
        } else {
            res.status(400).send('Invalid Food');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.delete_food = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food) {
            await Food.findOneAndDelete(req.params.id);
            res.status(200).send({
                status: true,
                message: 'delete food',
            });
        } else {
            res.status(400).send({ status: false, message: 'Invalid food' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
