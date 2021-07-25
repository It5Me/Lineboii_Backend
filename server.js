require('dotenv').config({ path: './config.env' });
const config = require('./src/config');
const express = require('express');
const connectDB = require('./src/config/db');
const app = express();

//when use req.body
app.use(express.json());
// app.post('/testserver', (req, res) => {
//     res.send('hellopim');
// });
connectDB();
app.listen(config.PORT, () =>
    console.log(`Server RUNNING ON PORT ${config.PORT}`)
);
