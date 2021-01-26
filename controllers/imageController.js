const routes = require('../routes');
const Image = require('../models/Image')

const home = async (req, res) => {
  try {
    const images = await Image.find({});
    res.render('home', { pageTitle: 'Home', images })
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Home', images: [] })
  }
};

const search = async (req, res) => {
  const { query: { term: searchingBy } } = req;
  const images = await Image.find({ title: { $regex: String(searchingBy), $options: 'i' } });
  res.render('search', { pageTitle: 'Search', searchingBy, images });
};

const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' });
}

const postUpload = async (req, res) => {
  const {
    body: { title, description, tag },
    file: { path }
  } = req;
  try {
    const newImage = await Image.create({
      fileUrl: path,
      title,
      description,
      tag
    })
    res.redirect(routes.imageDetail(newImage.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
}

const imageDetail = async (req, res) => {
  const { params: { id } } = req;
  const image = await Image.findById(id);
  res.render('imageDetail', { pageTitle: 'Image Detail', image }
)};

const getEditImage = async (req, res) => {
  const { params: { id } } = req;
  const image = await Image.findById(id);
  res.render('editImage', { pageTitle: 'Edit Image', image })
};

const postEditImage = async (req, res) => {
  const { body: { title, description }, params: { id } } = req;
  await Image.findByIdAndUpdate(id, { title, description });
  res.redirect(routes.imageDetail(id));
}

const deleteImage = async (req, res) => {
  const { params: { id } } = req;
  await Image.findByIdAndDelete(id);
  res.redirect(routes.home);
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
