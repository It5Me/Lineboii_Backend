const { Router } = require('express');
const router = Router();
const Authorization = require('../middleware/Authorization');
const BrandController = require('../controllers/BrandController');
router.get('/brand', Authorization, BrandController.brands_get);
router.get('/brand/restaurant', Authorization, BrandController.brand_get);

module.exports = router;
