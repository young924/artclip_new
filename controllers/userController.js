const passport = require('passport');

const routes = require('../routes');
const User = require('../models/User');
const Image = require('../models/Image');

const users = async (req, res) => {
  const users = await User.find({});
  res.render('users', { pageTitle: 'Users', users });
};

const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Sign Up' });
}

const postJoin = async (req, res, next) => {
  const { name, emailId, emailDomain, password, password2 } = req.body;
  const email = `${emailId}@${emailDomain}`;
  req.body.email = email; // next로 넘길때 passport.authenticate() 함수가 얘를 봐야 함 -> // usernameField를 email에서 name으로 바꿔서 필요 없을것같음
  if (password !== password2 || password.length < 8) {
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
  successRedirect: routes.home,
  failureRedirect: routes.login
});

// social login

const kakaoLogin = passport.authenticate('kakao');
const kakaoLoginCallback = passport.authenticate('kakao', {
  failureRedirect: routes.home,
});

const naverLogin = passport.authenticate('naver');
const naverLoginCallback = passport.authenticate('naver', {
  failureRedirect: routes.home,
})

const facebookLogin = passport.authenticate('facebook');
const facebookLoginCallback = passport.authenticate('facebook', {
  failureRedirect: routes.home,
})

const logout = (req, res) => {
  req.logout();
  res.redirect(req.url);
}

const showcase = (req, res) => res.render('showcase', { pageTitle: 'Showcase' });

const userDetail = async (req, res) => {
  try {
    const {
      params: {
        name: viewedName
      },
    } = req;
    const viewedUser = await User.findOne({ name: viewedName }).populate('images', 'fileUrl title');
    const images = viewedUser.images.reverse();
    if (req.user) {
      const {
        user: {
          name: viewerName
        }
      } = req;
      const viewer = await User.findOne({ name: viewerName });
      const viewerFollowesViewedUser = viewedUser.follower.includes(viewer._id) ? true : false;
      res.render('userDetail', { pageTitle: 'User Detail', viewedUser, viewerFollowesViewedUser, images });
    } else {
      const viewerFollowesViewedUser = false;
      res.render('userDetail', { pageTitle: 'User Detail', viewedUser, viewerFollowesViewedUser, images });
    }
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const follow = async (req, res) => {
  const {
    params: { name: followedName },
    user: { _id: followerId },
  } = req;
  try {
    // const follower = await User.findById(followerId);
    const followed = await User.findOne({ name: followedName });
    const followedId = followed._id;
    if (String(followedId) != String(followerId)) {
      // await follower.follow(followed);
      // await followed.getFollowed(follower);
      await User.findOneAndUpdate(
        { name: followedName },
        { $addToSet: { follower: followerId } }
      );
      await User.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: followedId } },
      );
    }
    res.redirect(routes.userDetail(followed.name));
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const unfollow = async (req, res) => {
  const {
    params: { name: unfollowedName },
    user: { _id: unfollowerId },
  } = req;
  try {
    // const follower = await User.findById(followerId);
    const unfollowed = await User.findOne({ name: unfollowedName });
    const unfollowedId = unfollowed._id;
    // await follower.follow(followed);
    // await followed.getFollowed(follower);
    await User.findOneAndUpdate(
      { name: unfollowedName },
      { $pull: { follower: unfollowerId } }
    );
    await User.findByIdAndUpdate(
      unfollowerId,
      { $pull: { following: unfollowedId } },
    );
    res.redirect(routes.userDetail(unfollowed.name));
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};

const getEditProfile = (req, res) => {
  res.render('editProfile', { pageTitle: 'Edit Profile' });
};

const postEditProfile = async (req, res) => {
  const {
    body: { name, career, description },
    file,
    user: { id },
  } = req;

  try {

    let nameChanged = false;

    if (name) {
      if (req.user.name !== name && await User.findOne({ name })) {
        res.status(400);
        return res.redirect(routes.editProfile(req.user.name));
      }
      await User.findByIdAndUpdate(id, { name });
      nameChanged = true;
    }

    if (file) {
      await User.findByIdAndUpdate(id, { avatarUrl: file.path });
    }

    if (career) {
      const careerList = career.split(',').map(e => e.trim());
      await User.findByIdAndUpdate(id, { career: careerList });
    }

    if (description) {
      await User.findByIdAndUpdate(id, { description })
    }

    if (nameChanged) {
      res.redirect(routes.userDetail(name));
    } else {
      res.redirect(routes.userDetail(req.user.name));
    }

  } catch (err) {
    console.error(err);
    res.redirect(routes.editProfile());
  }

};

const editInfo = (req, res) => {
  res.render('editInfo', { pageTitle: 'Account Info' });
};

module.exports = {
  users,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  kakaoLogin,
  kakaoLoginCallback,
  naverLogin,
  naverLoginCallback,
  facebookLogin,
  facebookLoginCallback,
  logout,
  showcase,
  userDetail,
  follow,
  unfollow,
  getEditProfile,
  postEditProfile,
  editInfo,
};
