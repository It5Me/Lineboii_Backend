const { Router } = require('express');
const router = Router();
const FoodAdditionController = require('../controllers/FoodAdditionController');
router.get('/foodaddtion', FoodAdditionController.foodAddition_get);
router.post('/foodaddition', FoodAdditionController.foodAddition_create);
router.put('/foodaddition/:id', FoodAdditionController.add_menu_foodaddition);
router.put('/foodaddition/edit/:id', FoodAdditionController.edit_foodaddition);
router.delete('/foodaddition/:id', FoodAdditionController.delete_foodaddition);
module.exports = router;
