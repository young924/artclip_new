const multer = require('multer');
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const routes = require('./routes');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-2",
})

const multerImage = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "artclip2021/image",
        // key: function (req, file, cb) {
        //     let extension = path.extname(file.originalname);
        //     cb(null, Date.now().toString() + extension);
        // },
    })
});

const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "artclip2021/avatar",
    })
});

const uploadImage = multerImage.single("imageFile");
const uploadAvatar = multerAvatar.single("avatar");

const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'Art Clip';
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
}

// 로그인 여부에 따라 접근 가능/불가능
const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}

const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

module.exports = {
    uploadImage,
    uploadAvatar,
    localsMiddleware,
    onlyPrivate,
    onlyPublic,
}