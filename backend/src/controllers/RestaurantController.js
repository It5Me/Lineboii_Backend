const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');

module.exports.get_restaurant = async (req, res) => {
    try {
        const currentRestaurant = await Restaurant.findById(req.params.id);
        return res.status(200).send(currentRestaurant);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.create_restuarant = async (req, res) => {
    console.log(req.body);
    try {
        const newRestaurant = await Restaurant.create(req.body);
        return res.status(200).send(newRestaurant);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.add_foodCategory_restaurant = async (req, res) => {
    let exist = false;
    console.log('req.body', req.body);
    try {
        const currentRestaurant = await Restaurant.findById(req.params.id).populate({
            path: 'foodCategories',
            model: 'foodcategory',
            select: 'header',
        });
        // console.log('current', currentRestaurant);
        if (currentRestaurant) {
            currentRestaurant.foodCategories.forEach((foodCategory) => {
                if (req.body.title === String(foodCategory.title)) {
                    exist = true;
                }
            });
            if (exist) {
                res.status(400).send('foodcategory already exist');
            } else {
                const newFoodCategory = await FoodCategory.create(req.body);
                const restaurant = await Restaurant.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $push: { foodCategories: newFoodCategory._id } },
                    { new: true }
                ).populate({
                    path: 'foodCategories',
                    model: 'foodcategory',
                    select: 'header',
                });
                res.status(200).send({ data: restaurant, message: 'update foodcategory in restaurant' });
            }
        } else {
            res.status(400).send('Invalid restaurant');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};
module.exports.edit_restaurant = async (req, res) => {
    try {
        const getRestaurant = await Restaurant.findOne({ _id: req.params.id });
        console.log(getRestaurant);
        if (getRestaurant) {
            await Restaurant.findByIdAndUpdate(getRestaurant._id, req.body);
            return res.status(200).json({
                status: true,
                message: 'Updata Restaurant Complete',
            });
        } else {
            res.status(400).send('Invalid Restaurant');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports.delete_restaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            await Restaurant.findOneAndDelete(req.params.id);
            res.status(200).send({
                status: true,
                message: 'delete restaurant',
            });
        } else {
            res.status(400).send({ status: false, message: 'Invalid restaurant' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
