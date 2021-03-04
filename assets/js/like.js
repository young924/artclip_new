import axios from "axios";

const likeButton = document.getElementById("jsLike");
const likeNumber = document.getElementById("jsLikeNumber");
const heartIcon = document.getElementById("jsHeart");

let like = heartIcon.classList.contains("fas") ? true : false;

const increaseLike = () => {
    likeNumber.innerHTML = parseInt(likeNumber.innerHTML, 10) + 1;
}

const decreaseLike = () => {
    likeNumber.innerHTML = parseInt(likeNumber.innerHTML, 10) - 1;
}

const fillHeart = () => {
    heartIcon.classList.replace("far", "fas");
}

const emptyHeart = () => {
    heartIcon.classList.replace("fas", "far");
}

const handleLike = async (event) => {
    const imageId = window.location.href.split("/images/")[1];
    let response;
    console.log(heartIcon.classList);
    try {
        if (like) {
            like = false;
            response = await axios({
                url: `/api/${imageId}/like`,
                method: "POST",
                data: {
                    like
                }
            });
            if (response.status === 200) {
                decreaseLike();
                emptyHeart();
            }
        } else {
            like = true;
            response = await axios({
                url: `/api/${imageId}/like`,
                method: "POST",
                data: {
                    like,
                }
            });
            if (response.status === 200) {
                increaseLike();
                fillHeart();
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function init() {
    likeButton.addEventListener("click", handleLike);
}

if (likeButton) {
    init();
}
