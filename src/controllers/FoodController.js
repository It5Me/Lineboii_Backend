const mongoose = require('mongoose');
const Food = mongoose.model('food');

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
    try {
        const currentFood = await Food.findById(req.params.id);
        // console.log('current', currentFood);
        if (currentFood) {
            currentFood.foodAdditions.map((value) => {
                if (req.body.foodAddition === String(value)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('foodaddition already exist');
            } else {
                const food = await Food.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { foodAdditions: req.body.foodAddition } },
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
    }
};
module.exports.delete_food = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food) {
            await Food.findByIdAndRemove(req.params.id);
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
