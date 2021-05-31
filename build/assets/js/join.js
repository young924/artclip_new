"use strict";

var joinForm = document.getElementById("jsJoinForm");
var joinCheck = document.getElementById("jsJoinCheckbox");
var joinBtn = document.getElementById("jsJoinBtn");
var checked = false;

function handleSubmit(event) {
  if (checked) {
    return true;
  } else {
    event.preventDefault();
  }
}

function handleCheck(event) {
  if (joinCheck.checked) {
    checked = true;
    joinBtn.style.backgroundColor = "rgba(161,52,255,1)";
    joinBtn.style.cursor = "pointer";
  } else {
    checked = false;
    joinBtn.style.backgroundColor = "#D9D9D9";
    joinBtn.style.cursor = "default";
  }
}

function init() {
  joinBtn.style.backgroundColor = "#D9D9D9";
  joinBtn.style.cursor = "default";
  joinCheck.addEventListener("click", handleCheck);
  joinBtn.addEventListener("click", handleSubmit);
}

if (joinForm) {
  init();
}