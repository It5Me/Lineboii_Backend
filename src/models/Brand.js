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
    name: 'ปลาหิมะนึงซีอิ้ว',
    price: 209,
    status: true,
});
menu.save();

const FoodAddition = mongoose.model('foodaddition');
const foodaddition = new FoodAddition({
    title: 'ปลาหิมะ',
    type: 'checkbox',
    additionalDetail: 'เพิ่มซอส',
    menuId: menu._id,
});
foodaddition.save();

const Food = mongoose.model('food');
const food = new Food({
    foodImageURL: 'shorturl.at/rGI12',
    title: 'ปลาแซลม่อน',
    subtitle: 'ปลาจากญี่ปุ่น',
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
    name: 'Fuji',
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
    name: 'Fuji',
    restaurants: restaurant._id,
});
brand.save();
mongoose.model('brand', brandSchema);
