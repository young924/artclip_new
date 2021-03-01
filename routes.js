// Global

const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';
const SHOWCASE = '/showcase';

// Users

const USERS = '/users';
const USER_DETAIL = '/:name'; // 프로필
const EDIT_PROFILE = '/:name/edit'; // 내 프로필 편집
const EDIT_INFO = '/:name/info';  // personal(=account) info
const FOLLOW = '/:name/follow';
const UNFOLLOW = '/:name/unfollow';

// Images

const IMAGES = '/images';
const UPLOAD = '/upload';
const IMAGE_DETAIL = '/:id';  // 다른 사람이 올린 image 볼 때
const EDIT_IMAGE = '/:id/edit'; // 내가 올린 image 수정할 때
const DELETE_IMAGE = '/:id/delete';

// Social Login

const KAKAO = '/auth/kakao';
const KAKAO_CALLBACK = '/auth/kakao/callback';
const NAVER = '/auth/naver';
const NAVER_CALLBACK = '/auth/naver/callback';
const FACEBOOK = '/auth/facebook';
const FACEBOOK_CALLBACK = '/auth/facebook/callback';

// API

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  showcase: SHOWCASE,
  users: USERS,
  userDetail: name => {
    if (name) {
      return `/users/${name}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: name => {
    if (name) {
      return `/users/${name}/edit`;
    } else {
      return EDIT_PROFILE;
    }
  },
  editInfo: name => {
    if (name) {
      return `/users/${name}/edit`;
    } else {
      return EDIT_INFO;
    }
  },
  follow: name => {
    if (name) {
      return `/users/${name}/follow`;
    } else {
      return FOLLOW;
    }
  },
  unfollow: name => {
    if (name) {
      return `/users/${name}/unfollow`;
    } else {
      return UNFOLLOW;
    }
  },
  images: IMAGES,
  upload: UPLOAD,
  imageDetail: id => {
    if (id) {
      return `/images/${id}`;
    } else {
      return IMAGE_DETAIL;
    }
  },
  editImage: id => {
    if (id) {
      return `/images/${id}/edit`;
    } else {
      return EDIT_IMAGE;
    }
  },
  deleteImage: id => {
    if (id) {
      return `/images/${id}/delete`;
    } else {
      return DELETE_IMAGE;
    }
  },
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
};

module.exports = routes;
