require("dotenv").config();
const crypto = require("crypto");

const passport = require("passport");
const User = require("./models/User");

const KakaoStrategy = require("passport-kakao").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // req.session 에 유저 id만 넣음
passport.deserializeUser(User.deserializeUser()); // cookie에 있는 값으로 req.session 에서 id 얻어와서 req.user에 유저 넣음

// kakao

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID, // kakao developer에서 발급받는 REST API 키
      callbackURL: "/auth/kakao/callback" // 인증 결과를 받을 라우터
    },
    async (_, __, profile, cb) => {
      console.log(profile);
      try {
        const {
          id,
          username: name,
          _json: {
            properties: { profile_image }
          }
        } = profile;
        const email =
          crypto.createHash("sha512").update(`kakao${id}`).digest("base64") +
          "@randomEmail.com";

        const user = await User.findOne({ email });
        if (user) {
          if (!user.kakoId) {
            user.kakaoID = id;
            await user.save();
          }
          return cb(null, user);
        } else {
          const newUser = await User.create({
            email,
            name,
            kakaoId: id,
            avatarUrl: profile_image
          });
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// naver

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: "/auth/naver/callback"
    },
    async (_, __, profile, cb) => {
      const {
        id,
        _json: { email }
      } = profile;
      try {
        const name = email.split("@")[0];
        // console.log(id, email, name);
        const user = await User.findOne({ email });
        if (user) {
          if (!user.naverId) {
            user.naverId = id;
            await user.save();
          }
          return cb(null, user);
        } else {
          const newUser = await User.create({
            email,
            name,
            naverId: id
          });
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback"
    },
    async (_, __, profile, cb) => {
      try {
        console.log(profile);
        const {
          id,
          _json: { name }
        } = profile;
        // facebook doesn't give email address
        const email =
          crypto.createHash("sha512").update(`facebook${id}`).digest("base64") +
          "@randomEmail.com";
        const user = await User.findOne({ email });
        if (user) {
          if (!user.facebookId) {
            user.facebookId = id;
            await user.save();
          }
          return cb(null, user);
        } else {
          const newUser = await User.create({
            name,
            email,
            facebookId: id
          });
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
