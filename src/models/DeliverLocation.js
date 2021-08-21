const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverLocationSchema = new Schema({
    address: {
        type: [mongoose.Types.ObjectId],
        unique: true,
    },
});
