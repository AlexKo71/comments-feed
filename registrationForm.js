import { loginFormElement, renderLoginForm } from "./loginForm.js";
import { firstPageElement } from "./firstPage.js";

const registrationFormElement = document.querySelector(".registration-form");

function renderRegistrationForm() {
  registrationFormElement.classList.remove("hide");
  loginFormElement.classList.add("hide");
  firstPageElement.classList.add("hide");
  registrationFormElement.innerHTML = ` <h2 class="add-form-title">Форма регистрации</h2>
       <input id="input-name"
          type="text"
          class="add-form-name input"
          placeholder="Введите ваше имя"
        />
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
          <button class="add-form-button button-wide">Зарегистрироваться</button>
        </div>
        <p id="registration-form-entrance" class="registration-text">
          <a href="#">Войти</a>
        </p>`;

  const registrationTextElement = document.querySelector(
    "#registration-form-entrance"
  );
  console.log(registrationTextElement);

  registrationTextElement.addEventListener("click", () => {
    renderLoginForm();
  });
}

export { renderRegistrationForm, registrationFormElement };
