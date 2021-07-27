require('dotenv').config({ path: './config.env' });
const config = require('./src/config');
const express = require('express');
const connectDB = require('./src/config/db');

connectDB();
const app = express();
const RestaurantRoute = require('./src/routes/RestaurantRoute');

//when use req.body
app.use(express.json());
// app.post('/testserver', (req, res) => {
//     res.send('hellopim');
// });
app.use(RestaurantRoute);
app.listen(config.PORT, () =>
    console.log(`Server RUNNING ON PORT ${config.PORT}`)
);
