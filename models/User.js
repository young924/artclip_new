const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        required: false
    },
    description: String,
    avatarUrl: {
        type: String,
        // default: default photo
    },
    kakaoID: Number,
    naverID: Number,
    googleID: Number,
    facebookID: Number,
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'name'});

module.exports = mongoose.model('User', UserSchema);