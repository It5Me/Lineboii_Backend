const { Router } = require('express');
const router = Router();
const RestaurantController = require('../controllers/RestaurantController');
const Authorization = require('../middleware/Authorization');
// router.get('/data', Authorization, RestaurantController.data_get);
router.get('/data', Authorization, RestaurantController.restaurant_home_get);

module.exports = router;
