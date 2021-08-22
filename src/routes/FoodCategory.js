const { Router } = require('express');
const router = Router();
const FoodCategoryController = require('../controllers/FoodCategoryController');
router.get('/foodcatagory/:id', FoodCategoryController.foodCategory_get);
router.post('/foodcatagory', FoodCategoryController.foodCategory_create);
router.put('/foodcatagory/addfood/:id', FoodCategoryController.add_foodCategory_restaurant);
router.delete('/foodcatagory/:id', FoodCategoryController.delete_foodCategory);
router.put('/foodcatagory/edit/:id', FoodCategoryController.foodCategory_edit);
module.exports = router;
