const { Router } = require('express');
const router = Router();
const FoodAdditionController = require('../controllers/FoodAdditionController');
router.get('/foodaddtion', FoodAdditionController.foodAddition_get);
router.post('/foodaddition', FoodAdditionController.foodAddition_create);
router.put('/foodaddition/:id', FoodAdditionController.add_menu_foodaddition);
module.exports = router;
