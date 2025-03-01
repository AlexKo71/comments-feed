import { renderListComments } from "./renderTask.js";
import { delay } from "./delay.js";
import { formatTime } from "./time.js";
import { inputName, inputText } from "./commentEditor.js";

const addFormElement = document.querySelector(".add-form");
let arrayComments = [];
const webdevUrl = "https://webdev-hw-api.vercel.app/api/v2/alex-ko";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
export let token;

function getApi() {
  delay(3000)
    .then(() => {
      return fetch(`${webdevUrl}/comments`, {
        method: "GET",
      });
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          time: formatTime(new Date(comment.date)),
          commentText: comment.text,
          likesCounter: comment.likes,
          isLiked: false,
          isEdit: false,
        };
      });
    })
    .then((responseData) => {
      arrayComments = responseData;
      renderListComments(arrayComments);
    });
}

function postApi() {
  addFormElement.style.display = "none";
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      text: inputText.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&prime;"),
      name: inputName.value
        .trim()
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&prime;"),
      forceError: true,
    }),
  })
    .then((response) => {
      if (response.status === 500) {
        return new Promise.reject(new Error("Сервер недоступен"));
      } else {
        return getApi(arrayComments);
      }
    })
    .then((data) => {
      return new Promise(() => {
        delay(3000).then(() => {
          addFormElement.style.display = "flex";
          inputName.value = "";
          inputText.value = "";
        });
      });
    })
    .catch((error) => {
      alert("Сервер сломался, попробуйте позже");
      console.log("Error name:", error.name);
      postApi();
    })
    .finally(() => {
      renderListComments(arrayComments);
    });
}

function loginUser({ login, password }) {
  addFormElement.style.display = "none";
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((responseData) => {
    console.log(responseData);
  });
}

export { getApi, postApi, arrayComments, loginUser };
