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
            // } else if (newBrandName && newImageURL) {
            //     await Brand.findByIdAndUpdate(getBrand._id, {
            //         $set: { brandName: newBrandName, brandImageURL: newImageURL },
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
            // } else {
            //     return res.send('Please enter brandName and brandImageURL');
            // }
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
    try {
        await Brand.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { restaurantId: req.body.restaurantId } },
            { new: true },
            function (err, doc) {
                if (!doc) {
                    res.send('Not Found Brand');
                } else {
                    res.send(doc.restaurantId);
                }
                // data = doc.restaurantId;
                // console.log('doc', doc.restaurantId);
            }
        );
    } catch (error) {
        res.send(error.message);
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
// function removeNull(obj) {
//     return Object.entries(obj).reduce((output, [key, val]) => {
//         if (val) output[key] = typeof val === 'object' ? removeNull(val) : val;
//         return output;
//     }, {});
// }
