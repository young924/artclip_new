import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentCreator = document.getElementById("jsCreator");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = async comment => {
  const li = document.createElement("li");
  const commentSpan = document.createElement("span");
  const dateSpan = document.createElement("span");
  commentSpan.innerHTML = `${commentCreator.innerHTML} : ${comment} `;
  dateSpan.innerHTML = Date.now().toLocaleString();
  li.appendChild(commentSpan);
  li.appendChild(dateSpan);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const imageId = window.location.href.split("/images/")[1];
  const response = await axios({
    url: `/api/${imageId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
