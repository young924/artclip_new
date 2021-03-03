import axios from "axios";

const likeButton = document.getElementById("jsLike");
const likeNumber = document.getElementById("jsLikeNumber");

const increaseLike = () => {
    likeNumber.innerHTML = parseInt(likeNumber.innerHTML, 10) + 1;
}

const handleLike = async (event) => {
    const imageId = window.location.href.split("/images/")[1];
    const response = await axios({
        url: `/api/${imageId}/like`,
        method: "POST",
    });
    if (response.status === 200) {
        increaseLike();
    }
}

function init() {
    likeButton.addEventListener("click", handleLike);
}

if (likeButton) {
    init();
}
