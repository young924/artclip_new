const multer = require('multer');
const routes = require('./routes');

const multerImage = multer({ dest: 'uploads/images/' });

const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'Art Clip';
    res.locals.routes = routes;
    res.locals.user = req.user;
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
    multerImage,
    localsMiddleware,
    onlyPrivate,
    onlyPublic,
}