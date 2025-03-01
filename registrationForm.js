import { loginFormElement, renderLoginForm } from "./loginForm.js";
import { firstPageElement } from "./firstPage.js";
import { comments } from "./renderTask.js";
import { renderAddCommentForm, addCommentFormElement } from "./commentForm.js";
import { renderListComments } from "./renderTask.js";

const registrationFormElement = document.querySelector("#registrationForm");

function renderRegistrationForm() {
  registrationFormElement.classList.remove("hide");
  loginFormElement.classList.add("hide");
  firstPageElement.classList.add("hide");
  registrationFormElement.innerHTML = ` <h2 class="add-form-title">Форма регистрации</h2>
       <input id="input-name"
        type="text" name = "name"
        class="add-form-name input" required
        placeholder="Введите ваше имя"
        minlength="3"
        maxlength="12"
        aria-errormessage="input-name-errors"
        />
        <span class="field_errors" id="input-name-errors" data-js-form-field_errors></span>
        <input id="input-login"
        type="text" name = "login"
        class="add-form-name input" required
        placeholder="Введите ваш логин"
        minlength="3"
        maxlength="12"
        aria-errormessage="input-login-errors"
      />
        <span class="field_errors" id="input-login-errors" data-js-form-field_errors></span>
        <input id="input-password"
        type="text" name = "password"
        class="add-form-name input"
        placeholder="Введите ваш пароль"
        minlength="4"
        maxlength="16"
        aria-errormessage="input-password-errors"
      />
        <span class="field_errors" id="input-password-errors" data-js-form-field_errors></span>
        <div class="add-form-row">
        <button id="registrationButton" type="submit" class="add-form-button button-wide">Зарегистрироваться</button>
        </div>
        <p id="registration-form-entrance" class="registration-text">
          <a href="#">Войти</a>
        </p>`;

  const registrationTextElement = document.querySelector(
    "#registration-form-entrance"
  );

  registrationTextElement.addEventListener("click", () => {
    renderLoginForm();
  });

  registrationData();
}

function registrationData() {
  registrationFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(registrationFormElement);

    console.log(Object.fromEntries(formData));
    comments.classList.remove("hide");
    addCommentFormElement.classList.remove("hide");
    renderListComments();
    renderAddCommentForm();
    registrationFormElement.classList.add("hide");
    addCommentFormElement.name.value = registrationFormElement.name.value;
    addCommentFormElement.name.setAttribute("disabled", "");
  });
}

export { renderRegistrationForm, registrationFormElement };
