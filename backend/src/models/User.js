const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const profileSchema = require('./Profile');
const userSchema = new Schema({
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    expiredIn: Date,
    profile_id: {
        type: mongoose.Types.ObjectId,
    },
});

mongoose.model('user', userSchema);
