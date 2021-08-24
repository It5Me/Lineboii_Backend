const { Router } = require('express');
const router = Router();
const FoodAdditionController = require('../controllers/FoodAdditionController');
router.get('/foodaddtion', FoodAdditionController.foodAddition_get);
router.post('/foodaddition', FoodAdditionController.create_foodAddition);
router.put('/foodaddition/:id', FoodAdditionController.add_menu_foodAddition);
router.put('/foodaddition/edit/:id', FoodAdditionController.edit_foodAddition);
router.delete('/foodaddition/:id', FoodAdditionController.delete_foodAddition);
module.exports = router;
