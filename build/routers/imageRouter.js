"use strict";

var express = require("express");

var routes = require("../routes");

var _require = require("../controllers/imageController"),
    getUpload = _require.getUpload,
    postUpload = _require.postUpload,
    imageDetail = _require.imageDetail,
    getEditImage = _require.getEditImage,
    postEditImage = _require.postEditImage,
    deleteImage = _require.deleteImage,
    postAddComment = _require.postAddComment,
    deleteComment = _require.deleteComment;

var _require2 = require("../middlewares"),
    uploadImage = _require2.uploadImage,
    onlyPrivate = _require2.onlyPrivate,
    awsDeleteImage = _require2.awsDeleteImage;

var imageRouter = express.Router();
imageRouter.get(routes.upload, onlyPrivate, getUpload);
imageRouter.post(routes.upload, onlyPrivate, uploadImage, postUpload);
imageRouter.get(routes.imageDetail(), imageDetail);
imageRouter.get(routes.editImage(), onlyPrivate, getEditImage);
imageRouter.post(routes.editImage(), onlyPrivate, postEditImage);
imageRouter.get(routes.deleteImage(), onlyPrivate, awsDeleteImage, deleteImage);
imageRouter.post(routes.addComment(), onlyPrivate, postAddComment);
imageRouter.get(routes.deleteComment(), onlyPrivate, deleteComment);
module.exports = imageRouter;