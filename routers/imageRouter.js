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
const { multerImage } = require('../middlewares');

const imageRouter = express.Router();

imageRouter.get(routes.upload, getUpload);
imageRouter.post(routes.upload, multerImage.single('imageFile'), postUpload);
imageRouter.get(routes.imageDetail(), imageDetail);
imageRouter.get(routes.editImage(), getEditImage);
imageRouter.post(routes.editImage(), postEditImage);
imageRouter.get(routes.deleteImage(), deleteImage);

module.exports = imageRouter;
