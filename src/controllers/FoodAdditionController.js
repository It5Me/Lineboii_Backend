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
        let menusId = [];
        // console.log('body creat foodad', req.body.menus);
        const newMenu = await Menu.create(req.body.menus);
        console.log(newMenu);
        newMenu.forEach((menuId) => {
            console.log('menuId', menuId.id);
            menusId.push(menuId.id);
        });
        req.body['menus'] = menusId;
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
        if (currentFoodAddition) {
            console.log('have foodaddition');
            currentFoodAddition.menus.forEach((menu) => {
                console.log('name', menu.name);
                if (req.body.name === String(menu.name)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('menu already exist');
            } else {
                const newMenu = await Menu.create(req.body);
                console.log('newMenu', newMenu._id);
                const foodaddition = await FoodAddition.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { menus: newMenu._id } },
                    { new: true }
                ).populate({
                    path: 'menus',
                    model: 'menu',
                    select: 'name price',
                });
                console.log(foodaddition);
                res.status(200).send({ data: foodaddition, message: 'update menu in foodaddition' });
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
