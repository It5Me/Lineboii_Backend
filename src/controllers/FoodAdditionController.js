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
