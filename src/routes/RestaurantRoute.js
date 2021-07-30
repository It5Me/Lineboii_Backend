const { Router } = require('express');
const router = Router();
const RestaurantController = require('../controllers/RestaurantController');
const Authorization = require('../middleware/Authorization');
// router.get('/data', Authorization, RestaurantController.data_get);
router.get('/restaurants/home', Authorization, RestaurantController.restaurant_home_get);
router.get('/restaurants/trending', Authorization, RestaurantController.restaurant_trending_get);
router.get('/restaurants/recommend', Authorization, RestaurantController.restaurant_recommend_get);

module.exports = router;
