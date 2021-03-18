const routes = require("../routes");
const Image = require("../models/Image");
const User = require("../models/User");
const Comment = require("../models/Comment");

const home = async (req, res) => {
  try {
    const images = await Image.find({}).sort({ _id: -1 }).populate("creator");
    res.render("home", { pageTitle: "Home", images });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", images: [] });
  }
};

const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let images = [];
  try {
    images = await Image.find({
      title: { $regex: String(searchingBy), $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: searchingBy, searchingBy, images });
};

const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

const postUpload = async (req, res) => {
  const {
    body: { title, description, tag, volatile },
    file: { location },
    user: { id }
  } = req;
  try {
    const newImage = await Image.create({
      creator: id,
      fileUrl: location,
      title,
      description,
      tag,
      volatile: volatile === "on" ? false : true
    });
    await User.findByIdAndUpdate(id, {
      $push: { images: newImage },
      $set: { lastUpload: Date.now() }
    });
    res.redirect(routes.imageDetail(newImage.id));
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const imageDetail = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    let like;
    const image = await Image.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
          select: "name avatarUrl"
        }
      });
    image.views += 1;
    if (!req.user) like = false;
    else {
      const user = await User.findById(req.user._id);
      if (user.likeImages.includes(id)) like = true;
      else like = false;
    }
    image.save();
    res.render("imageDetail", { pageTitle: image.title, image, like });
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const getEditImage = async (req, res) => {
  try {
    const {
      params: { id },
      user: { _id: userId }
    } = req;
    const image = await Image.findById(id);
    if (String(image.creator._id) !== String(userId))
      return res.redirect(routes.home);
    // 로그인된 유저가 해당 이미지 creator 아니면 home으로 보내기
    else res.render("editImage", { pageTitle: `Edit ${image.title}`, image });
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
      user: { _id: userId }
    } = req;
    const image = await Image.findById(id);
    if (String(image.creator._id) !== String(userId)) {
      // 로그인된 유저가 해당 이미지 creator 아니면 home으로 보내기
      return res.redirect(routes.home);
    }
    await Image.findByIdAndUpdate(id, { title, description });
    res.redirect(routes.imageDetail(id));
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const deleteImage = async (req, res) => {
  const {
    params: { id },
    user: { _id: userId }
  } = req;
  try {
    const image = await Image.findById(id);
    if (String(image.creator._id) !== String(userId))
      return res.redirect(routes.home); // 로그인된 유저가 해당 이미지 creator 아니면 home으로 보내기
    await Image.findByIdAndDelete(id); // mongoose에서 지우고
    // creator의 images에서도 삭제
    await User.updateOne({ _id: userId }, { $pull: { images: id } });
    res.redirect(routes.home);
  } catch (err) {
    console.error(err);
    res.redirect(routes.editImage(id));
  }
};

const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const image = await Image.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    image.comments.push(newComment.id);
    image.save();
    res.redirect(routes.imageDetail(id));
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

const deleteComment = async (req, res) => {
  const {
    params: { id, commentId }
  } = req;
  try {
    await Image.updateOne(
      { _id: id },
      { $pull: { comments: { _id: commentId } } }
    );
    await Comment.findByIdAndDelete(commentId);
    res.redirect(routes.imageDetail(id));
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

const postLike = async (req, res) => {
  const {
    params: { id },
    body: { like },
    user
  } = req;
  try {
    const image = await Image.findById(id);
    if (like === true && !user.likeImages.includes(id)) {
      image.likes += 1;
      user.likeImages.push(image);
      user.save();
      image.save();
    } else if (like === false && user.likeImages.includes(id)) {
      image.likes -= 1;
      const index = user.likeImages.indexOf(id);
      user.likeImages.splice(index, 1);
      user.save();
      image.save();
    }
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

module.exports = {
  home,
  search,
  getUpload,
  postUpload,
  imageDetail,
  getEditImage,
  postEditImage,
  deleteImage,
  deleteComment,
  postLike,
  postAddComment
};
