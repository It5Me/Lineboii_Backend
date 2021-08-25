const mongoose = require('mongoose');
const FoodAddition = mongoose.model('foodaddition');
const Menu = mongoose.model('menu');
module.exports.get_foodAddition = async (req, res) => {
    try {
        const currentFoodAddition = await FoodAddition.findById(req.params.id);
        res.status(200).send(currentFoodAddition);
    } catch (error) {
        console.log(error.message);
    }
};
module.exports.create_foodAddition = async (req, res) => {
    try {
        const newFoodAddition = await FoodAddition.create(req.body);
        return res.status(200).send(newFoodAddition);
    } catch (error) {
        console.log(error.message);
        if (error.code === 11000) {
            return res.status(400).send('menu already exist!');
        }
        return res.status(400).send({ status: false, message: error.message });
    }
};
module.exports.add_menu_foodAddition = async (req, res) => {
    let exist = false;
    console.log('body', req.body);
    try {
        const currentFoodAddition = await FoodAddition.findById(req.params.id).populate({
            path: 'menus',
            model: 'menu',
            select: 'name',
        });
        // console.log('currentFoodAddition', currentFoodAddition.menus);
        const newMenu = await Menu.findById(req.body.menu, { name: 1 });
        console.log('newMenu', newMenu);
        if (currentFoodAddition) {
            currentFoodAddition.menus.map((menu) => {
                console.log('name', menu.name);
                if (newMenu.name === String(menu.name)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('menu already exist');
            } else {
                const foodaddition = await FoodAddition.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { menus: req.body.menu } },
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
module.exports.edit_foodAddition = async (req, res) => {
    console.log(req.body);
    try {
        const getFoodAddition = await FoodAddition.findOne({ _id: req.params.id });
        console.log('getFoodAddition', getFoodAddition);
        if (getFoodAddition) {
            await FoodAddition.findByIdAndUpdate(getFoodAddition._id, req.body);
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
module.exports.delete_foodAddition = async (req, res) => {
    try {
        const foodaddition = await FoodAddition.findById(req.params.id);
        if (foodaddition) {
            await FoodAddition.findByIdAndRemove(req.params.id);
            res.status(200).send({
                status: true,
                message: 'delete foodaddition',
            });
        } else {
            res.status(400).send({ status: false, message: 'Invalid foodaddition' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
