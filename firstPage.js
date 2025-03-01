import { comments } from "./renderTask.js";
import { delay } from "./delay.js";
import { renderListComments } from "./renderTask.js";
import { getApi } from "./api.js";
import { renderLoginForm } from "./loginForm.js";

const firstPageElement = document.querySelector("#firstPage");

function renderFirstpage() {
  delay().then(() => {
    comments.textContent = "Пожалуйста подождите, комментарии загружаются...";
  });
  getApi();
  renderListComments();

  firstPageElement.innerHTML = `<div class="authorization-start-text">Чтобы добавить комментарий, <span class="authorization-start-input">авторизуйтесь</span></div>`;

  const authorizationStartInputElement = document.querySelector(
    ".authorization-start-input"
  );

  authorizationStartInputElement.addEventListener("click", (event) => {
    renderLoginForm();
  });
}

export { firstPageElement, renderFirstpage };
