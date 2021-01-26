const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    followed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

module.exports = mongoose.model('Follow', FollowSchema);