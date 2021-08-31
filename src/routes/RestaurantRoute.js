const { Router } = require('express');
const router = Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get('/restaurant/:id', RestaurantController.get_restaurant);
router.post('/restaurant', RestaurantController.create_restuarant);
router.put('/restaurant/addfoodcategory/:id', RestaurantController.add_foodCategory_restaurant);
router.put('/restaurant/edit/:id', RestaurantController.edit_restaurant);
router.delete('/restaurant/:id', RestaurantController.delete_restaurant);

module.exports = router;

// new
// restaurant_create
