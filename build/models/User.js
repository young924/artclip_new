"use strict";

var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
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
    "default": "https://artclip2021.s3.ap-northeast-2.amazonaws.com/source/unknownartist_final.png"
  },
  career: [String],
  follower: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  }],
  likeImages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  }],
  lastUpload: {
    type: Date,
    "default": Date.now
  },
  kakaoID: Number,
  naverID: Number,
  googleID: Number,
  facebookID: Number
});
UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});
module.exports = mongoose.model("User", UserSchema);