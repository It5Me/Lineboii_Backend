const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: {
        type: String,
    },
    addressDetail: {
        type: String,
    },
    contactName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    houseNo: {
        type: String,
    },
});
