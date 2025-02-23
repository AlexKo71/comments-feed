import { firstPageElement } from "./firstPage.js";
import { comments } from "./renderTask.js";
import {
  renderRegistrationForm,
  registrationFormElement,
} from "./registrationForm.js";

const loginFormElement = document.querySelector(".login-form");

function renderLoginForm() {
  loginFormElement.classList.remove("hide");
  firstPageElement.classList.add("hide");
  registrationFormElement.classList.add("hide");
  comments.classList.add("hide");
  loginFormElement.innerHTML = `<h2 class="add-form-title">Форма входа</h2>
       <input id="input-login"
          type="text"
          class="add-form-name input"
          placeholder="Введите ваш логин"
        />
        <input id="input-password"
        type="text"
        class="add-form-name input"
        placeholder="Введите ваш пароль"
      />
        <div class="add-form-row">
          <button class="add-form-button button-wide">Войти</button>
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
}

export { renderLoginForm, loginFormElement };
