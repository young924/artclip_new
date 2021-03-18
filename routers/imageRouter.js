const express = require('express');
const routes = require('../routes');
const {
  getUpload,
  postUpload,
  imageDetail,
  getEditImage,
  postEditImage,
  deleteImage,
  postAddComment,
  deleteComment,
} = require('../controllers/imageController');
const { uploadImage, onlyPrivate, awsDeleteImage } = require('../middlewares');

const imageRouter = express.Router();

imageRouter.get(routes.upload, onlyPrivate, getUpload);
imageRouter.post(routes.upload, onlyPrivate, uploadImage, postUpload);
imageRouter.get(routes.imageDetail(), imageDetail);
imageRouter.get(routes.editImage(), onlyPrivate, getEditImage);
imageRouter.post(routes.editImage(), onlyPrivate, postEditImage);
imageRouter.get(routes.deleteImage(), onlyPrivate, awsDeleteImage, deleteImage);
imageRouter.post(routes.addComment(), onlyPrivate, postAddComment);
imageRouter.get(routes.deleteComment(), onlyPrivate, deleteComment);

module.exports = imageRouter;
