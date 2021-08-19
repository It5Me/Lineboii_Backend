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
module.exports.add_menu_foodaddition = async (req, res) => {
    let exist = false;
    try {
        const currentfoodaddition = await FoodAddition.findById(req.params.id);
        console.log(currentfoodaddition);
        if (currentfoodaddition) {
            currentfoodaddition.menus.map((value) => {
                if (req.body.menuId === String(value)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('menu already exist');
            } else {
                const foodaddition = await FoodAddition.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { menus: req.body.menuId } },
                    { new: true }
                ).populate({
                    path: 'menus',
                    model: 'menu',
                    select: 'name price',
                });
                console.log(foodaddition);
                res.status(200).send({ data: foodaddition, message: 'update menuId in foodaddition' });
            }
        } else {
            res.status(400).send('Invalid foodaddition');
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports.edit_foodaddition = async (req, res) => {
    console.log(req.body);
    try {
        const getFoodAddition = await FoodAddition.findOne({ _id: req.params.id });
        console.log('getFoodAddition', getFoodAddition);
        if (getFoodAddition) {
            const newFoodAddition = await FoodAddition.findByIdAndUpdate(getFoodAddition._id, req.body, { new: true });
            console.log(newFoodAddition);
            return res.status(200).json({
                status: true,
                message: 'Updata FoodAddition Complete',
            });
        } else {
            res.status(400).send('Invalid FoodAddition');
        }
    } catch (error) {
        console.log(error);
    }
};
