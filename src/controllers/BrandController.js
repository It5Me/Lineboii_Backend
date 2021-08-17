const mongoose = require('mongoose');
const Brand = mongoose.model('brand');
const Restaurant = mongoose.model('restaurant');
const { inspect } = require('util');

module.exports.brandList_get = async (req, res) => {
    const limit = Number.parseInt(req.query.limit);
    try {
        const brandsRestaurant = await Brand.find({}, { restaurantId: 0 }, { limit: limit });
        console.log(brandsRestaurant);
        return res.status(200).json({ status: true, message: brandsRestaurant });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
// not use // for check brand
module.exports.brand_get = async (req, res) => {
    const brandName = req.query.brandName;
    try {
        const brandRestaurants = await Brand.find({ brandName: brandName });
        // console.log(brandRestaurants.restaurantId[0]);
        // console.log(brandRestaurants);

        if (!brandRestaurants.length) {
            return res.status(404).json({ status: false, message: 'Invalid Brandname' });
        }
        console.log(brandRestaurants);

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
    console.log(req.body);
    // const restaurantId = req.body.restaurantId ? req.body.restaurantId : null;
    try {
        const currentBrand = await Brand.findOne({ brandName: req.body.brandName });
        if (currentBrand) {
            return res.status(400).send('Brand already exist!');
        } else {
            const brand = await new Brand(req.body);
            await brand.save();
            return res.status(200).send(brand);
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('restaurant already exist!');
        }
        return res.status(400).send(error.message);
    }
};
module.exports.brand_edit = async (req, res) => {
    try {
        const getBrand = await Brand.findOne({ _id: req.params.id });
        console.log('getBrand', getBrand);
        if (getBrand) {
            await Brand.findByIdAndUpdate(getBrand._id, req.body);
            return res.status(200).json({
                status: true,
                message: 'Updata Brand Complete',
            });
        } else {
            res.status(400).send('Invalid BrandName');
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports.add_restaurant_brand = async (req, res) => {
    let exist = false;
    console.log('req', req.body.restaurantId);
    try {
        const brand = await Brand.findById(req.params.id);
        brand.restaurantId.map((value) => {
            // console.log(value);
            if (req.body.restaurantId === String(value)) {
                exist = true;
            }
        });
        if (exist) {
            res.status(400).send('restaurant already exist');
        } else {
            const brand = await Brand.findByIdAndUpdate(
                { _id: req.params.id },
                { $push: { restaurantId: req.body.restaurantId } },
                { new: true }
            );
            res.send({
                data: brand,
                message: 'update restaurantId',
            });
        }
    } catch (error) {
        return res.send(error.message);
    }
};
module.exports.brand_restaurantList_get = async (req, res) => {
    const brandName = req.query.brandName;
    // console.log('name', name);
    if (brandName === null || brandName === undefined) {
        return res.status(404).json({ status: false, message: 'Brandname undefined' });
    }
    try {
        const brandRestaurants = await Brand.findOne({ brandName: brandName }, { restaurantId: 1, brandName: 1 })
            .populate({
                path: 'restaurantId',
                model: 'restaurant',
                select: 'name deliveryPrice distance restaurantImageURL supportedTypes isOfficial',
            })
            .exec();
        console.log(brandRestaurants);
        //put array
        // const restaurant = await Restaurant.find({ _id: brandRestaurants.restaurantId });
        // console.log('restaurant', restaurant);

        return res.status(200).json({ status: true, message: brandRestaurants });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
