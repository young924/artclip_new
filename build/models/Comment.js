"use strict";

var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // image: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Image"
  // },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  likes: {
    type: Number,
    "default": 0
  },
  dislikes: {
    type: Number,
    "default": 0
  },
  report: {
    type: Number,
    "default": 0
  }
});
module.exports = mongoose.model("Comment", CommentSchema);