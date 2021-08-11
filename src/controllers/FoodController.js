const mongoose = require('mongoose');
const FoodAddition = mongoose.model('foodaddition');
const Restaurant = mongoose.model('restaurant');
module.exports.restaurant_foods_get = async (req, res) => {
    // const nameRestaurant = req.query.nameRestaurant;
    // try {
    //     const restaurant = await Restaurant.findOne({ name: nameRestaurant }).populate({
    //         path: 'foodCategoriesId',
    //         model: 'foodcategory',
    //         select: 'header',
    //         populate: {
    //             path: 'foodId',
    //             model: 'food',
    //             select: 'foodImageURL title subtitle price',
    //         },
    //     });

    // } catch (error) {
    //     console.log(error.message);
    // }
    res.send('success');
};
