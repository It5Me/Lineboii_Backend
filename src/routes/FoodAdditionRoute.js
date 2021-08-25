const { Router } = require('express');
const router = Router();
const FoodAdditionController = require('../controllers/FoodAdditionController');
router.get('/foodaddtion/:id', FoodAdditionController.get_foodAddition);
router.post('/foodaddition', FoodAdditionController.create_foodAddition);
router.put('/foodaddition/add/:id', FoodAdditionController.add_menu_foodAddition);
router.put('/foodaddition/edit/:id', FoodAdditionController.edit_foodAddition);
router.delete('/foodaddition/:id', FoodAdditionController.delete_foodAddition);
module.exports = router;
