const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: [String],
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    report: {
        type: Number,
        default: 0
    },
    private: {
        type: Boolean,
        default: false
    },
    volatile: {
        type: Boolean,
        default: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ]
})

module.exports = mongoose.model('Image', ImageSchema);