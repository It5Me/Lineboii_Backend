const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const brandSchema = new Schema({
    name: {
        type: String,
    },
    restaurants: {
        type: mongoose.Types.ObjectId,
    },
});
const Menu = mongoose.model('menu');
const menu = new Menu({
    name: 'ขนมปัง',
    price: 15,
    status: true,
});
menu.save();

const FoodAddition = mongoose.model('foodaddition');
const foodaddition = new FoodAddition({
    title: 'ความหวาน',
    type: 'checkbox',
    additionalDetail: 'หวาน 50%',
    menuId: menu._id,
});
foodaddition.save();

const Food = mongoose.model('food');
const food = new Food({
    foodImageURL: 'shorturl.at/rGI12',
    title: 'แบล็คคอฟฟี่น้ำผึง',
    subtitle: 'Iced Honey Black Coffee',
    price: 65,
    foodAdditionId: foodaddition._id,
});
food.save();
const FoodCategory = mongoose.model('foodcategory');
const foodcategory = new FoodCategory({
    header: 'กาแฟ',
    foodId: food._id,
});
foodcategory.save();
const Restaurant = mongoose.model('restaurant');
const restaurant = new Restaurant({
    name: 'Amazonn',
    isOfficial: true,
    dailyCloseTime: 'จะปิดในเวลา 20:00',
    dailyOpenTime: 'จะเปิดในเวลา 10:00',
    isPickup: true,
    distance: 1.5,
    restaurantImageURL: 'shorturl.at/rGI12',
    foodCategoriesId: foodcategory._id,
    myScore: 21,
    overallScore: 23,
});
restaurant.save();
const Brand = mongoose.model('brand', brandSchema);
const brand = new Brand({
    name: 'Amazon',
    restaurants: restaurant._id,
});
brand.save();
mongoose.model('brand', brandSchema);
