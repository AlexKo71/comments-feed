import { getApi } from "./api.js";
import { renderListComments } from "./renderTask.js";
import { delay } from "./delay.js";
import { addComment } from "./commentEditor.js";

const comments = document.querySelector(".comments");

delay().then(() => {
  comments.textContent = "Пожалуйста подождите, комментарии загружаются...";
});

getApi();
renderListComments();
addComment();
