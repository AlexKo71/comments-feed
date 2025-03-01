import { firstPageElement } from "./firstPage.js";
import { comments } from "./renderTask.js";
import {
  renderRegistrationForm,
  registrationFormElement,
} from "./registrationForm.js";
import { loginUser, postApi } from "./api.js";
import { renderListComments } from "./renderTask.js";
import { addCommentFormElement, renderAddCommentForm } from "./commentForm.js";
import { addComment } from "./commentEditor.js";

const loginFormElement = document.querySelector("#loginForm");

function renderLoginForm() {
  loginFormElement.classList.remove("hide");
  firstPageElement.classList.add("hide");
  registrationFormElement.classList.add("hide");
  comments.classList.add("hide");
  loginFormElement.innerHTML = `<h2 class="add-form-title">Форма входа</h2>
       <input id="input-login"
        type="text" name = "login"
        class="add-form-name input" required
        placeholder="Введите ваш логин"
        minlength="3"
        maxlength="12"
        />
        <input id="input-password"
        type="text" name = "password"
        class="add-form-name input" required
        placeholder="Введите ваш пароль"
        minlength="4"
        maxlength="16"
        />
        <div class="add-form-row">
        <button id="entranceButton" type="submit" class="add-form-button button-wide">Войти</button>
        </div>
        <p id="login-form-registration" class="registration-text">
        <a href="#">Зарегистрироваться</a>
        </p>`;

  const registrationTextElement = document.querySelector(
    "#login-form-registration"
  );

  registrationTextElement.addEventListener("click", () => {
    renderRegistrationForm();
  });

  loginData();
}

function loginData() {
  loginFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginFormElement);
    console.log(Object.fromEntries(formData));
    comments.classList.remove("hide");
    addCommentFormElement.classList.remove("hide");
    renderListComments();
    renderAddCommentForm();
    loginFormElement.classList.add("hide");
    // addCommentFormElement.name.value = registrationFormElement.name.value;
    addCommentFormElement.name.setAttribute("disabled", "");
    
  });
}

export { renderLoginForm, loginFormElement };
