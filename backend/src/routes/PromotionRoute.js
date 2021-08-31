const { Router } = require('express');
const PromotionController = require('../controllers/PromotionController');

const router = Router();

router.get('/promotionlist', PromotionController.promotionList_get);
router.get('/promotion', PromotionController.promotion_get);
router.post('/promotioncreate', PromotionController.promotion_create);

router.get('/promotionsetlist', PromotionController.promotionSetList_get);
router.get('/promotionset', PromotionController.promotionSet_get);
router.post('/promotioncreateset', PromotionController.promotionSet_create);

router.get('/getpromotionsettoday', PromotionController.promotionSetToday_get);

router.put('/promotionset', PromotionController.promotionSet_put);
module.exports = router;
