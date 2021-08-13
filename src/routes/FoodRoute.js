const { Router } = require('express');
const router = Router();
const FoodCategoryController = require('../controllers/FoodCategoryController');
router.post('/foodcategory/create', FoodCategoryController.foodCategory_create);

module.exports = router;
