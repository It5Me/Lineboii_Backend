const { response } = require('express');
const mongoose = require('mongoose');
const Brand = mongoose.model('brand');
module.exports.brandList_get = async (req, res) => {
    const limit = Number.parseInt(req.query.limit);
    try {
        const brandsRestaurant = await Brand.find({}, {}, { limit: limit }).populate({
            path: 'restaurantId',
            model: 'restaurant',
            select: 'name restaurantImageURL',
        });
        console.log(brandsRestaurant);
        return res.status(200).json({ status: true, message: brandsRestaurant });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
module.exports.brand_get = async (req, res) => {
    const name = req.query.brandName;
    if (name === null || name === undefined) {
        return res.status(404).json({ status: false, message: 'Brandname undefined' });
    }
    try {
        const brandRestaurants = await Brand.find({ name: name });
        // console.log(brandRestaurants);
        if (!brandRestaurants.length) {
            return res.status(404).json({ status: false, message: 'Invalid Brandname' });
        }
        // console.log(brandRestaurants);
        return res.status(200).json({ status: true, message: brandRestaurants });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
module.exports.brand_create = async (req, res) => {
    try {
        console.log(req.body);
        const brand = new Brand({
            name: req.body.brandName,
            brandImageURL: req.body.brandImageURL,
            restaurantId: req.body.restaurantId,
        });
        await brand.save();
        console.log(brand);
        return res.status(200).end(brand);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
};
