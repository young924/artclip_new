"use strict";

// Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search";
var SHOWCASE = "/showcase"; // Users

var USERS = "/users";
var USER_DETAIL = "/:name"; // 프로필

var EDIT_PROFILE = "/:name/edit"; // 내 프로필 편집

var EDIT_INFO = "/:name/info"; // personal(=account) info

var FOLLOW = "/:name/follow";
var UNFOLLOW = "/:name/unfollow"; // Images

var IMAGES = "/images";
var UPLOAD = "/upload";
var IMAGE_DETAIL = "/:id"; // 다른 사람이 올린 image 볼 때

var EDIT_IMAGE = "/:id/edit"; // 내가 올린 image 수정할 때

var DELETE_IMAGE = "/:id/delete";
var ADD_COMMENT = "/:id/add-comment";
var DELETE_COMMENT = "/:id/delete-comment/:commentId"; // Social Login

var KAKAO = "/auth/kakao";
var KAKAO_CALLBACK = "/auth/kakao/callback";
var NAVER = "/auth/naver";
var NAVER_CALLBACK = "/auth/naver/callback";
var FACEBOOK = "/auth/facebook";
var FACEBOOK_CALLBACK = "/auth/facebook/callback"; // API

var API = "/api";
var LIKE = "/:id/like";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  showcase: SHOWCASE,
  users: USERS,
  userDetail: function userDetail(name) {
    if (name) {
      return "/users/".concat(name);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: function editProfile(name) {
    if (name) {
      return "/users/".concat(name, "/edit");
    } else {
      return EDIT_PROFILE;
    }
  },
  editInfo: function editInfo(name) {
    if (name) {
      return "/users/".concat(name, "/edit");
    } else {
      return EDIT_INFO;
    }
  },
  follow: function follow(name) {
    if (name) {
      return "/users/".concat(name, "/follow");
    } else {
      return FOLLOW;
    }
  },
  unfollow: function unfollow(name) {
    if (name) {
      return "/users/".concat(name, "/unfollow");
    } else {
      return UNFOLLOW;
    }
  },
  images: IMAGES,
  upload: UPLOAD,
  imageDetail: function imageDetail(id) {
    if (id) {
      return "/images/".concat(id);
    } else {
      return IMAGE_DETAIL;
    }
  },
  editImage: function editImage(id) {
    if (id) {
      return "/images/".concat(id, "/edit");
    } else {
      return EDIT_IMAGE;
    }
  },
  deleteImage: function deleteImage(id) {
    if (id) {
      return "/images/".concat(id, "/delete");
    } else {
      return DELETE_IMAGE;
    }
  },
  deleteComment: function deleteComment(id, commentId) {
    if (id && commentId) {
      return "/images/".concat(id, "/delete-comment/").concat(commentId);
    } else {
      return DELETE_COMMENT;
    }
  },
  addComment: function addComment(id) {
    if (id) {
      return "/images/".concat(id, "/add-comment");
    } else {
      return ADD_COMMENT;
    }
  },
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  like: LIKE
};
module.exports = routes;