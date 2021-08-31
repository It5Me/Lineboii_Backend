const { Router } = require('express');
const router = Router();
const FoodController = require('../controllers/FoodController');
router.get('/food/:id', FoodController.food_get);
router.post('/food', FoodController.food_create);
router.put('/food/addfoodaddition/:id', FoodController.add_foodaddition_food);
router.delete('/food/:id', FoodController.delete_food);
module.exports = router;
