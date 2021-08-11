const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');
const { inspect } = require('util');
const FoodController = require('../controllers/FoodController');
module.exports.restaurant_home_get = async (req, res) => {
    const user = req.user;
    const limit = Number.parseInt(req.query.limit);

    try {
        if (!user) {
            return res.send('NoAuthorization');
        }
        const restaurants = await Restaurant.find({}, { name: 1, restaurantImageURL: 1 }, { limit: limit });

        console.log('restaurantData', restaurants);
        // res.status(200).json({ status: true, message: restaurants });
        res.send(food);
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
        // console.log(restaurantsTrending);
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
        await Restaurant.findOne({ name: nameRestaurant })
            .populate({
                path: 'foodCategoriesId',
                model: 'foodcategory',
                select: 'header ',
                populate: {
                    path: 'foodId',
                    model: 'food',
                    select: 'title subtitle price foodImageURL',
                    populate: {
                        path: 'foodAdditionId',
                        model: 'foodaddition',
                        select: 'title type amount additionalDetail',
                        populate: {
                            path: 'menuId',
                            model: 'menu',
                            select: 'name price status',
                        },
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
            message: message,
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

module.exports.restaurant_create = (req, res) => {
    try {
    } catch (error) {
        console.log(err);
    }
};

module.exports.get_restaurant = async (req, res) => {
    const nameRestaurant = req.query.nameres;
    try {
        const getRestaurants = await Restaurant.findOne({ name: nameRestaurant });
        res.send(getRestaurants);
    } catch (error) {
        console.log(error);
    }
};
