const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');
const Foodset = mongoose.model('foodset');
module.exports.restaurant_home_get = (req, res) => {
    const user = req.user;
    // console.log(req.user.profile_id.displayName);
    try {
        if (!user) {
            return res.send('NoAuthorization');
        }
        Restaurant.find({}, { name: 1, restaurantImageURL: 1 }, function (err, restaurant) {
            // console.log('resPim', restaurant);
            console.log(restaurant[0]);
        });
        // console.log('resPim', restaurantHomeData.);
        res.send('succes Restaurant');
    } catch (error) {
        console.log(error);
    }
};

// module.exports.restaurant_post = (req, res) => {
//     console.log('restaurant', req.user.accessToken);
//     res.send('post');
// };
