// Global

const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';
const SHOWCASE = '/showcase';

// Users

const USERS = '/users';
const USER_DETAIL = '/:id'; // 프로필
const EDIT_PROFILE = '/:id/edit'; // 내 프로필 편집
const EDIT_INFO = '/:id/info';  // personal(=account) info

// Images

const IMAGES = '/images';
const UPLOAD = '/upload';
const IMAGE_DETAIL = '/:id';  // 다른 사람이 올린 image 볼 때
const EDIT_IMAGE = '/:id/edit'; // 내가 올린 image 수정할 때
const DELETE_IMAGE= '/:id/delete';

// social login
const KAKAO = '/auth/kakao';
const KAKAO_CALLBACK = '/auth/kakao/callback';
const NAVER = '/auth/naver';
const NAVER_CALLBACK = '/auth/naver/callback';
const FACEBOOK = '/auth/facebook';
const FACEBOOK_CALLBACK = '/auth/facebook/callback';

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  showcase: SHOWCASE,
  users: USERS,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  editInfo: EDIT_INFO,
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
    if(id) {
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
};

module.exports = routes;
