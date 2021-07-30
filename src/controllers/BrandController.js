const mongoose = require('mongoose');
const Brand = mongoose.model('brand');
module.exports.brands_get = async (req, res) => {
    const limit = Number.parseInt(req.query.limit);
    try {
        const brandsRestaurant = await Brand.find({}, {}, { limit: limit }).populate({
            path: 'restaurants',
            model: 'restaurant',
            select: 'name restaurantImageURL',
        });
        console.log(brandsRestaurant);
        res.json(brandsRestaurant);
    } catch (error) {
        console.log(error);
    }
};
module.exports.brand_get = async (req, res) => {
    const name = req.query.brandName;
    if (name === null || name === undefined) {
        res.send('No brandName');
    }
    try {
        const brandRestaurants = await Brand.find({ name: name });
        console.log(brandRestaurants);
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message,
        });
    }
};
