const passport = require('passport');

const routes = require('../routes');
const User = require('../models/User');

const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Sign Up' });
}

const postJoin = async (req, res, next) => {
  const { name, emailId, emailDomain, password, password2 } = req.body;
  const email = `${emailId}@${emailDomain}`;
  req.body.email = email; // next로 넘길때 passport.authenticate() 함수가 얘를 봐야 함 -> // usernameField를 email에서 name으로 바꿔서 필요 없을것같음
  if ( password !== password2 || password.length < 8 ) {
      res.status(400);
      res.render('join', { pageTitle: 'join', passwordUnmatch: true });
  } else if (await User.findOne({ name })) {
      res.status(400);
      res.render('join', { pageTitle: 'join', userAlreadyExist: true });
  } else {
      try {
          const user = User({ name, email });
          // passport-local-mongoose가 준 register 함수. mongodb의 해당 유저에 salt, hash 필드 작성하여 저장함. (이 단계에서는 아직 쿠키나 세션같은건 없음!!!!!!)
          await User.register(user, password); 
          next();
      } catch (err) {
          console.error(err);
          res.redirect('/');
      }
  }
};

const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'Sign In' });
}

const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});

const logout = (req, res) => {
  // TODO : Process Log Out
  res.redirect(routes.home);
}

const showcase = (req, res) => res.render('showcase', { pageTitle: 'Showcase' });

const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });

const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });

const editInfo = (req, res) => res.render('editInfo', { pageTitle: 'Account Info' });

module.exports = {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  showcase,
  userDetail,
  editProfile,
  editInfo,
};
