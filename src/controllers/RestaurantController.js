const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');

module.exports.restaurant_home_get = async (req, res) => {
    const user = req.user;
    const limit = Number.parseInt(req.query.limit);

    try {
        if (!user) {
            return res.send('NoAuthorization');
        }
        const restaurants = await Restaurant.find({}, { name: 1, restaurantImageURL: 1 }, { limit: limit });

        console.log('restaurantData', restaurants);
        res.json(restaurants);
    } catch (error) {
        console.log(error);
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
        res.json(restaurantsTrending);
    } catch (error) {
        console.log(error);
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
        res.json(restaurantRecommend);
    } catch (error) {
        console.log(error);
    }
};
