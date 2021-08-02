const { Router } = require('express');
const router = Router();
const Authorization = require('../middleware/Authorization');
const BrandController = require('../controllers/BrandController');
router.get('/brands', Authorization, BrandController.brands_get);
router.get('/brand/restaurants', Authorization, BrandController.brand_get);

module.exports = router;
