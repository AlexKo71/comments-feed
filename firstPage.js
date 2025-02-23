import { comments } from "./renderTask.js";
import { delay } from "./delay.js";
import { renderListComments } from "./renderTask.js";
import { addComment } from "./commentEditor.js";
import { getApi } from "./api.js";
import { renderLoginForm } from "./loginForm.js";

const firstPageElement = document.querySelector("#first-page");

function renderFirstpage() {
  delay().then(() => {
    comments.textContent = "Пожалуйста подождите, комментарии загружаются...";
  });
  getApi();
  renderListComments();
  addComment();
  firstPageElement.innerHTML = `<div class="authorization-start-text">Чтобы добавить комментарий, <span class="authorization-start-input">авторизуйтесь</span></div> 
    <div class="comments-info-download">"Комментарий загружается..."</div>`;

  const authorizationStartInputElement = document.querySelector(
    ".authorization-start-input"
  );

  authorizationStartInputElement.addEventListener("click", (event) => {
    console.log(authorizationStartInputElement);
    renderLoginForm();
  });
}

export { firstPageElement, renderFirstpage };
