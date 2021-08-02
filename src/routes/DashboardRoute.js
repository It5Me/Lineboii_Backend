const { Router } = require('express');
const DashboardController = require('../controllers/DashboardController');
// const Authorization = require('../middleware/Authorization');
const router = Router();

router.get('/dashboard/promotionsRestaurants', DashboardController.promotion_get);

module.exports = router;
