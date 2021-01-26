const multer = require('multer');
const routes = require('./routes');

const multerImage = multer({ dest: 'uploads/images/' });

const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'Art Clip';
    res.locals.routes = routes;
    res.locals.user = req.user;
    next();
}

module.exports = {
    multerImage,
    localsMiddleware
}