const fs = require('fs');
const path = require('path');

const routes = require('../routes');
const Image = require('../models/Image')
const User = require('../models/User');

const home = async (req, res) => {
  try {
    const images = await Image.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', images })
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Home', images: [] })
  }
};

const search = async (req, res) => {
  const { query: { term: searchingBy } } = req;
  let images = []
  try {
    images = await Image.find({ title: { $regex: String(searchingBy), $options: 'i' } });
  } catch (error) {
    console.log(error);
  }
  res.render('search', { pageTitle: searchingBy, searchingBy, images });
};

const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' });
}

const postUpload = async (req, res) => {
  const {
    body: { title, description, tag },
    file: { path },
    user: { id },
  } = req;
  try {
    const newImage = await Image.create({
      creator: id,
      fileUrl: path,
      title,
      description,
      tag
    })
    await User.findByIdAndUpdate(id, { $push: { images: newImage } });
    res.redirect(routes.imageDetail(newImage.id));
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
}

const imageDetail = async (req, res) => {
  try {
    const { params: { id } } = req;
    const image = await Image.findById(id).populate("creator");
    res.render('imageDetail', { pageTitle: image.title, image });
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const getEditImage = async (req, res) => {
  try {
    const {
      params: { id },
      user: { _id: userId },
    } = req;
    const image = await Image.findById(id);
    if (String(image.creator._id) !== String(userId)) return res.redirect(routes.home); // 로그인된 유저가 해당 이미지 creator 아니면 home으로 보내기
    else res.render('editImage', { pageTitle: `Edit ${image.title}`, image });
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const postEditImage = async (req, res) => {
  try {
    const {
      body: { title, description },
      params: { id },
      user: { _id: userId },
    } = req;
    const image = await Image.findById(id);
    if (String(image.creator._id) !== String(userId)) { // 로그인된 유저가 해당 이미지 creator 아니면 home으로 보내기
      return res.redirect(routes.home);
    }
    await Image.findByIdAndUpdate(id, { title, description });
    res.redirect(routes.imageDetail(id));
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
}

const deleteImage = async (req, res) => {
  try {
    const {
      params: { id },
      user: { _id: userId },
    } = req;
    const image = await Image.findById(id);
    if (String(image.creator._id) !== String(userId)) return res.redirect(routes.home); // 로그인된 유저가 해당 이미지 creator 아니면 home으로 보내기
    await Image.findByIdAndDelete(id); // mongoose에서 지우고
    fs.unlink( // 파일도 지우고
      path.resolve(__dirname, '..', ...image.fileUrl.split('\\')),
      (err) => {
        if (err) throw err;
        console.log(`image file(title:${image.title}, id:${id}) was deleted`);
      }
    );
    res.redirect(routes.home);
  } catch (err) {
    console.error(err);
    res.redirect(routes.editImage(id));
  }
}

module.exports = {
  home,
  search,
  getUpload,
  postUpload,
  imageDetail,
  getEditImage,
  postEditImage,
  deleteImage
};
