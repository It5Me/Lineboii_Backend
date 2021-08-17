const { Router } = require('express');
const router = Router();
const FoodAdditionController = require('../controllers/FoodAdditionController');
router.get('/foodaddtion', FoodAdditionController.foodAddition_get);
router.post('/foodaddtion', FoodAdditionController.foodAddition_create);

module.exports = router;
