const { Router } = require('express');
const router = Router();
const FoodController = require('../controllers/FoodController');
router.post('/foodcategory/create', FoodController.foodCategory_create);

module.exports = router;
