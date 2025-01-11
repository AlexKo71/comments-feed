const comments = document.querySelector(".comments");
const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");
const timeInputText = document.getElementById("time-input");
const addFormButton = document.querySelector(".add-button");
const lastDeleteComment = document.querySelector("last-delete-button");
const listComments = document.querySelectorAll(".comment");
const buttonDeleteLastComment = document.querySelector(".last-delete-button");

//Функция определения текущей даты времени:

function timeNow() {
  const currentDate = new Date();
  const optionsDate = { year: "2-digit", month: "numeric", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };

  return `${currentDate.toLocaleDateString(
    "ru-Ru",
    optionsDate
  )} ${currentDate.toLocaleTimeString("ru-RU", optionsTime)}`;
}

// массив данных

const arrayComments = [
  {
    name: "Глеб Фокин",
    time: "12.02.22 12:18",
    commentText: "Это будет первый комментарий на этой странице",
    likesCounter: 3,
    isLike: false,
    isEdit: false,
  },
  {
    name: "Варвара Н.",
    time: "13.02.22 19:22",
    commentText: "Мне нравится как оформлена эта страница! ❤",
    likesCounter: 75,
    isLike: true,
    isEdit: false,
  },
];

// событие на клик по кнопке "Написать"

const addEvent = addFormButton.addEventListener("click", () => {
  inputName.classList.remove("error");
  inputText.classList.remove("error");

  if (inputName.value === "") {
    inputName.classList.add("error");
    return;
  } else if (inputText.value === "") {
    inputText.classList.add("error");
    return;
  } else {
    arrayComments.push({
      name: inputName.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&prime;"),
      time: timeNow(),
      commentText: inputText.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&prime;"),
      likesCounter: "0",
      isLike: false,
    });

    renderListComments();
    inputName.value = "";
    inputText.value = "";
  }
});

// событие на клик по кнопке "Удалить последний комментарий"

const deleteLastComment = buttonDeleteLastComment.addEventListener(
  "click",
  () => {
    let lastElement = arrayComments.pop();
    renderListComments();
  }
);

// добавление, удаление лайков

const likeDislike = () => {
  const likeButtonElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      likeButtonElement.classList.toggle("-active-like");
      const index = likeButtonElement.dataset.index;
      console.log(index);
      if (likeButtonElement.classList.contains("-active-like")) {
        arrayComments[index].isLike = true;
        arrayComments[index].likesCounter++;
      } else {
        arrayComments[index].isLike = false;
        arrayComments[index].likesCounter--;
      }
      renderListComments();
    });
  }
};

// отзыв к комметарию

const feedbackToComment = () => {
  const commentTextElements = document.querySelectorAll(".comment");

  for (const commentTextElement of commentTextElements) {
    const index = commentTextElement.dataset.index;
    commentTextElement.addEventListener("click", () => {
      inputText.value = `< ${arrayComments[index].commentText} (${arrayComments[index].name})`;
      renderListComments();
    });
  }
};

// обновление списка - рендеринг

function renderListComments() {
  comments.innerHTML = arrayComments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.time}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.commentText}
            </div>
          </div>
          <div class="comment-footer">
           <div class="edit-button">
            <div class="likes">
              <span class="likes-counter">${comment.likesCounter}</span>
              <button data-index="${index}" class="like-button ${
        comment.isLike ? "-active-like" : ""
      }"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  likeDislike();
  feedbackToComment();
}

renderListComments();
