const { Router } = require('express');
const router = Router();
const Authorization = require('../middleware/Authorization');
const BrandController = require('../controllers/BrandController');
router.get('/brands', Authorization, BrandController.brandList_get);
router.get('/brand/restaurants', Authorization, BrandController.brand_get);
router.post('/brand/create', Authorization, BrandController.brand_create);
module.exports = router;
