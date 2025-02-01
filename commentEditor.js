import { postApi, arrayComments } from "./api.js";

const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");
const addFormButton = document.querySelector(".add-button");

function addComment() {
  addFormButton.addEventListener("click", () => {
    inputName.classList.remove("error");
    inputText.classList.remove("error");

    try {
      if (inputName.value.trim().length < 3) {
        inputName.classList.add("error");
        throw new SyntaxError(
          console.log("В поле 'Введите ваше имя' введено меньше 3 символов")
        );
      } else if (inputText.value.trim().length < 3) {
        inputText.classList.add("error");
        throw new SyntaxError(
          console.log("В поле 'Введите ваше имя' введено меньше 3 символов")
        );
      }
    } catch (error) {
      alert("Введено меньше 3 символов");
    }

    postApi();
  });
}

function feedbackToComment() {
  const commentTextElements = document.querySelectorAll(".comment");

  for (const commentTextElement of commentTextElements) {
    const index = commentTextElement.dataset.index;
    commentTextElement.addEventListener("click", () => {
      inputText.value = `< ${arrayComments[index].commentText} (${arrayComments[index].name})`;
      renderListComments(arrayComments);
    });
  }
}

export { addComment, feedbackToComment, inputName, inputText };
