const { Router } = require('express');
const router = Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get('/data', RestaurantController.data_get);
router.post('/data', RestaurantController.data_post);

module.exports = router;
