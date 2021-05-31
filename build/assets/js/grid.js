"use strict";

var cards = document.querySelectorAll(".grid__item"),
    cardImgList = ["imgs/cards/1.png", "imgs/cards/2.png", "imgs/cards/3.png", "imgs/cards/4.png", "imgs/cards/5.png", "imgs/cards/6.png", "imgs/cards/7.png", "imgs/cards/8.png", "imgs/cards/9.png", "imgs/cards/10.png", "imgs/cards/11.png", "imgs/cards/12.png", "imgs/cards/13.png", "imgs/cards/14.png", "imgs/cards/15.png", "imgs/cards/16.png"];

function handleMouseover(e) {
  var card = e.target,
      buttons = card.querySelector(".grid__item__buttons"),
      info = card.querySelector(".grid__item__info"),
      cardImg = card.querySelector(".grid__image");

  if (buttons && info) {
    buttons.classList.remove("__hidden");
    info.classList.remove("__hidden");
  }

  cardImg.style = "transform:scale(1.1)";
}

function handleMouseout(e) {
  var card = e.target,
      buttons = card.querySelector(".grid__item__buttons"),
      info = card.querySelector(".grid__item__info"),
      cardImg = card.querySelector(".grid__image");

  if (buttons && info) {
    buttons.classList.add("__hidden");
    info.classList.add("__hidden");
  }

  cardImg.style = "transform:scale(1)";
}

function init() {
  var i = 0;
  cards.forEach(function (card) {
    cardImg = card.querySelector(".grid__image");
    cardImg.src = cardImgList[i];
    i++;
    card.addEventListener("mouseenter", handleMouseover);
    card.addEventListener("mouseleave", handleMouseout);
  });
}

init();