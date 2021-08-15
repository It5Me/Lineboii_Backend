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
    // console.log(req.body);
    const restaurantId = req.body.restaurantId ? req.body.restaurantId : null;
    try {
        if (restaurantId !== null) {
            brand = new Brand({
                brandName: req.body.brandName,
                brandImageURL: req.body.brandImageURL,
                restaurantId: [restaurantId],
            });
        } else {
            brand = new Brand({
                brandName: req.body.brandName,
                brandImageURL: req.body.brandImageURL,
            });
        }
        await brand.save();
        console.log('brand', brand);
        return res.status(200).send(brand);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('Brand already exist!');
        }
        return res.status(400).send(error.message);
    }
};
module.exports.brand_put = async (req, res) => {
    // let message = '';
    // const newrestaurantId = req.body.restaurantId ? req.body.restaurantId : null;
    // const newBrandName = req.body.brandName ? req.body.brandName : null;
    // const newImageURL = req.body.brandImageURL ? req.body.brandImageURL : null;
    try {
        const getBrand = await Brand.findOne({ brandName: req.params.name });
        console.log('getBrand', getBrand);
        if (getBrand) {
            // if (newBrandName && newImageURL && newrestaurantId) {
            //     console.log('id', getBrand._id);
            //     console.log('newrestaurantId', newrestaurantId);
            //     await Brand.findByIdAndUpdate(getBrand._id, {
            //         $set: { brandName: newBrandName, brandImageURL: newImageURL },
            //         $addToSet: { restaurantId: newrestaurantId },
            //     }).exec(function (err, docs) {
            //         // const data = docs;
            //         // console.log('data', data);
            //         // console.log('remove', removeNull(data));
            //         // const rmnulldata = removeNull(data);
            //         // console.log(rmnulldata);
            //         return res.status(200).json({
            //             status: true,
            //             message: 'Updata Brand Complete',
            //         });
            //     });
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
module.exports.brand_restaurantId_put = async (req, res) => {
    let exist = false;
    console.log('req', req.body.restaurantId);
    try {
        const brand = await Brand.findById(req.params.id);
        // if (!doc) {
        //     return res.send('Not Found Brand');
        // }
        // else {
        //     res.send(doc.restaurantId);
        // }
        // data = doc.restaurantId;
        // console.log('doc', doc.restaurantId);
        brand.restaurantId.map((value) => {
            console.log(value);
            if (req.body.restaurantId === String(value)) {
                console.log('hey');
                // return res.send('dup');
                exist = true;
            }
        });
        if (exist) {
            res.send('brand already exist');
        } else {
            await Brand.updateOne({ _id: req.params.id }, { $push: { restaurantId: req.body.restaurantId } });
            res.send('update restaurantId');
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
        const brandRestaurants = await Brand.findOne({ brandName: brandName }, { restaurantId: 1, brandName: 1 });
        // console.log(brandRestaurants.restaurantId[0]);
        // console.log(brandRestaurants);
        console.log(brandRestaurants.restaurantId);
        if (!brandRestaurants) {
            return res.status(404).json({ status: false, message: 'Invalid Brandname' });
        }
        //put array
        const restaurant = await Restaurant.find({ _id: brandRestaurants.restaurantId });
        console.log('restaurant', restaurant);

        // console.log(brandRestaurants);

        return res.status(200).json({ status: true, brandName: brandRestaurants.brandName, message: restaurant });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
