const express = require('express');
const routes = require('../routes');
const {
  getUpload,
  postUpload,
  imageDetail,
  getEditImage,
  postEditImage,
  deleteImage,
} = require('../controllers/imageController');
const { multerImage, onlyPrivate } = require('../middlewares');

const imageRouter = express.Router();

imageRouter.get(routes.upload, onlyPrivate, getUpload);
imageRouter.post(routes.upload, onlyPrivate, multerImage.single('imageFile'), postUpload);
imageRouter.get(routes.imageDetail(), imageDetail);
imageRouter.get(routes.editImage(), onlyPrivate, getEditImage);
imageRouter.post(routes.editImage(), onlyPrivate, postEditImage);
imageRouter.get(routes.deleteImage(), onlyPrivate, deleteImage);

module.exports = imageRouter;
