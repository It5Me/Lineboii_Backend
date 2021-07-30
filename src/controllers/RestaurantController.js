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
        const restaurantsTrending = await Restaurant.find({}, { name: 1 }, { sort: { field: 'asc', overallScore: -1 }, limit: limit });
        console.log(restaurantsTrending);
    } catch (error) {
        console.log(error);
    }
};
module.exports.restaurant_recommend_get = async (req, res) => {};

// module.exports.restaurant_post = (req, res) => {
//     console.log('restaurant', req.user.accessToken);
//     res.send('post');
// };
