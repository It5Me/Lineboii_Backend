const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: {
        type: String,
        require: true,
    },
    displayName: {
        type: String,
        require: true,
    },
    pictureUrl: {
        type: String,
        require: true,
    },
    statusMessage: {
        type: String,
        require: true,
    },
});
console.log('create profile');
mongoose.model('profile', profileSchema);
// module.exports = profileSchema;
