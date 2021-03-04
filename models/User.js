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
    career: [String],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    }],
    likeImages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    }],
    kakaoID: Number,
    naverID: Number,
    googleID: Number,
    facebookID: Number,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);