const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');
const Food = mongoose.model('food');
const { inspect } = require('util');

module.exports.restaurant_home_get = async (req, res) => {
    const user = req.user;
    const limit = Number.parseInt(req.query.limit);

    try {
        if (!user) {
            return res.send('NoAuthorization');
        }
        const restaurants = await Restaurant.find({}, { name: 1, restaurantImageURL: 1 }, { limit: limit });

        console.log('restaurantData', restaurants);
        res.status(200).json({ status: true, message: restaurants });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
module.exports.restaurant_trending_get = async (req, res) => {
    const limit = Number.parseInt(req.query.limit);
    try {
        const restaurantsTrending = await Restaurant.find(
            {},
            { name: 1, restaurantImageURL: 1, overallScore: 1 },
            { sort: { field: 'asc', overallScore: -1 }, limit: limit }
        );
        console.log(restaurantsTrending);
        return res.status(200).json({ status: true, message: restaurantsTrending });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
module.exports.restaurant_recommend_get = async (req, res) => {
    const limit = Number.parseInt(req.query.limit);
    try {
        const restaurantRecommend = await Restaurant.find(
            {},
            { name: 1, restaurantImageURL: 1, myScore: 1 },
            { sort: { field: 'asc', myScore: -1 }, limit: limit }
        );
        console.log(restaurantRecommend);
        return res.status(200).json({ status: true, message: restaurantRecommend });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
module.exports.restaurant_food_get = async (req, res) => {
    const nameRestaurant = req.query.nameRestaurant;
    let message = '';
    // console.log('nameRestaurant', nameRestaurant);
    try {
        const dataRestaurant = await Restaurant.findOne({ name: nameRestaurant }, {}, {})
            .populate({
                path: 'foodId',
                model: 'food',
                select: 'title foodAddition',
                populate: {
                    path: 'foodAddition',
                    model: 'foodaddition',
                    select: 'title type menuId',
                    populate: {
                        path: 'menuId',
                        model: 'menu',
                        select: 'name price',
                    },
                },
            })
            .exec(function (err, docs) {
                console.log(inspect(docs, { depth: null }));
                message = docs;
            });
        console.log('message', message);

        return res.status(200).json({
            status: true,
            message: dataRestaurant,
        });
    } catch (error) {
        console.log('error');
        console.log(error.message);
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
module.exports.restaurant_menus_get = async (req, res) => {
    const nameRestaurant = req.query.nameRestaurant;
    try {
        const menusRestaurant = await Restaurant.find({ name: nameRestaurant }).populate({
            path: 'menuId',
            model: 'menu',
            select: 'name',
        });
        console.log('menusRestaurant', menusRestaurant);
    } catch (error) {
        console.log(error.message);
    }
};
