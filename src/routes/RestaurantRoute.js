const { Router } = require('express');
const router = Router();
const RestaurantController = require('../controllers/RestaurantController');

router.post('/data', RestaurantController.data_get);

module.exports = router;
