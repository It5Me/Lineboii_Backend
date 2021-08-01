const { Router } = require('express');
const router = Router();
const RestaurantController = require('../controllers/RestaurantController');
const Authorization = require('../middleware/Authorization');
router.get('/restaurants/home', Authorization, RestaurantController.restaurant_home_get);
router.get('/restaurants/trending', Authorization, RestaurantController.restaurant_trending_get);
router.get('/restaurants/recommend', Authorization, RestaurantController.restaurant_recommend_get);
router.get('/restaurant/food', Authorization, RestaurantController.restaurant_food_get);

module.exports = router;
