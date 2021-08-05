// const mongoose = require('mongoose');
// const Promotion = mongoose.model('promotion');
// module.exports.promotionList_get = async (req, res) => {
//     try {
//         const getPromotion = await Promotion.find({});
//         res.send(getPromotion);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };
// module.exports.promotion_get = async (req, res) => {
//     try {
//         const getPromotion = await Promotion.findById(req.query.id);
//         res.send(getPromotion);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };
// module.exports.promotion_create = async (req, res) => {
//     try {
//         const promotion = new Promotion({
//             title: req.body.title,
//             restaurantId: req.body.restaurantId,
//         });
//         await promotion.save();
//         res.send(promotion);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };

// //promotionset
// const PromotionSet = mongoose.model('promotionset');
// module.exports.promotionSetList_get = async (req, res) => {
//     try {
//         const getPromotion = await PromotionSet.find({});
//         res.send(getPromotion);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };
// module.exports.promotionSet_get = async (req, res) => {
//     try {
//         const getPromotion = await PromotionSet.findById(req.query.id);
//         res.send(getPromotion);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };
// module.exports.promotionSet_create = async (req, res) => {
//     // console.log('active', new Date(req.body.active));
//     try {
//         const promotion = await Promotion.findById(req.body.promotionId);
//         if (promotion) {
//             console.log(promotion);
//             const promotionSet = new PromotionSet({
//                 selectPromotion: promotion._id,
//                 active: new Date(req.body.active),
//                 expireIn: new Date(req.body.expireIn),
//             });
//             await promotionSet.save();
//             console.log('save', promotionSet);
//             fetchPromotiontoday();
//             res.send(promotionSet);
//         } else {
//             res.status(404).send('Promotion Not Found');
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };
// global.promotionToday = null;
// const fetchPromotiontoday = async () => {
//     try {
//         promotionToday = await PromotionSet.find(
//             // active<now<expire
//             { active: { $lte: new Date() }, expireIn: { $gte: new Date() }, disable: false },
//             { selectPromotion: 1 }
//         ).populate({
//             path: 'selectPromotion',
//             model: 'promotion',
//             select: 'title',
//             populate: {
//                 path: 'restaurantId',
//                 model: 'restaurant',
//                 select: 'name restaurantImageURL',
//             },
//         });
//     } catch (error) {
//         console.log(error);
//     }

//     // console.log(promotionToday);
// };
// fetchPromotiontoday();
// module.exports.promotionSetToday_get = async (req, res) => {
//     try {
//         console.log('promotiontoday', promotionToday);
//         res.send(promotionToday);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };

// //ถ้าค้องการไม่ให้ promotions ที่เคยถูกสร้างไว้แสดง หรือ ไม่แสดง
// module.exports.promotionSet_put = async (req, res) => {
//     try {
//         const getPromotion = await PromotionSet.findById(req.query.id);
//         if (getPromotion) {
//             getPromotion.set({
//                 disable: req.body.disable,
//             });
//             await getPromotion.save();
//             fetchPromotiontoday();
//             res.send(getPromotion);
//         } else {
//             res.status(404).send('Promotion Not Found');
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// };
