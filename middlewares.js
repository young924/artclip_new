const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const routes = require("./routes");
const Image = require("./models/Image");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

const multerImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "artclip2021/image"
  })
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "artclip2021/avatar"
  })
});

const uploadImage = multerImage.single("imageFile");
const uploadAvatar = multerAvatar.single("avatar");

const awsDeleteImage = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;
    const image = await Image.findById(id);
    const url = image.fileUrl.split("/");
    const fileName = url[url.length - 1];

    s3.deleteObject(
      {
        Bucket: "artclip2021/image",
        Key: fileName
      },
      function (err) {
        if (err) throw new Error("Cannot delete object");
      }
    );
    next();
  } catch (err) {
    console.error(err);
    res.redirect(routes.editImage(id));
  }
};

const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Art Clip";
  res.locals.logoImageUrl =
    "https://artclip2021.s3.ap-northeast-2.amazonaws.com/source/KakaoTalk_Photo_2021-03-09-18-06-06.png";
  res.locals.greyImageUrl =
    "https://artclip2021.s3.ap-northeast-2.amazonaws.com/source/solid+grey+image.jpg";
  res.locals.routes = routes;
  res.locals.loginImage =
    "https://artclip2021.s3.ap-northeast-2.amazonaws.com/source/login.jpg";
  res.locals.loggedUser = req.user || null;
  next();
};

// 로그인 여부에 따라 접근 가능/불가능
const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

module.exports = {
  awsDeleteImage,
  uploadImage,
  uploadAvatar,
  localsMiddleware,
  onlyPrivate,
  onlyPublic
};
