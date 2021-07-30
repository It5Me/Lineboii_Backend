const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');

module.exports.restaurant_home_get = async (req, res) => {
    const user = req.user;
    const limit = req.query.limit;
    try {
        if (!user) {
            return res.send('NoAuthorization');
        }
        const restaurant = await Restaurant.find({}, { name: 1, restaurantImageURL: 1 }, { limit: limit });

        console.log('restaurantData', restaurant);
        res.json(restaurant);
    } catch (error) {
        console.log(error);
    }
};

// module.exports.restaurant_post = (req, res) => {
//     console.log('restaurant', req.user.accessToken);
//     res.send('post');
// };
