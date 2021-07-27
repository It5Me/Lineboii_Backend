const { Router } = require('express');
const router = Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get('/', RestaurantController.data_get);

module.exports = router;
