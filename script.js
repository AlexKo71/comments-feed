const comments = document.querySelector(".comments");
const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");
const timeInputText = document.getElementById("time-input");
const addFormButton = document.querySelector(".add-button");
const lastDeleteComment = document.querySelector("last-delete-button");
const listComments = document.querySelectorAll(".comment");
const buttonDeleteLastComment = document.querySelector(".last-delete-button");
let loadingLike = false;
let isLoading = false;
const addFormElement = document.querySelector(".add-form");
const infoDownLoadElement = document.querySelector(".comments-info-download");

//Функция определения текущей даты времени:

const currentDate = new Date();
const optionsDate = { year: "2-digit", month: "numeric", day: "numeric" };
const optionsTime = { hour: "2-digit", minute: "2-digit" };

function formatTime(date) {
  return `${date.toLocaleDateString(
    "ru-Ru",
    optionsDate
  )} ${date.toLocaleTimeString("ru-RU", optionsTime)}`;
}

// массив данных

// const arrayComments = [
//   {
//     name: "Глеб Фокин",
//     time: "12.02.22 12:18",
//     commentText: "Это будет первый комментарий на этой странице",
//     likesCounter: 3,
//     isLike: false,
//     isEdit: false,
//   },
//   {
//     name: "Варвара Н.",
//     time: "13.02.22 19:22",
//     commentText: "Мне нравится как оформлена эта страница! ❤",
//     likesCounter: 75,
//     isLike: true,
//     isEdit: false,
//   },
// ];

let arrayComments = [];

delay().then(() => {
  comments.textContent = "Пожалуйста подождите, комментарии загружаются...";
});

function fetchGetData() {
  delay(3000)
    .then(() => {
      return fetch("https://webdev-hw-api.vercel.app/api/v1/alex-ko/comments", {
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
      renderListComments();
    });
}

fetchGetData();

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
    addFormElement.style.display = "none";
    infoDownLoadElement.style.display = "block";
    return fetch("https://webdev-hw-api.vercel.app/api/v1/alex-ko/comments", {
      method: "POST",
      body: JSON.stringify({
        text: inputText.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&prime;"),
        name: inputName.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&prime;"),
      }),
    })
      .then((response) => {
        return fetchGetData();
      })
      .then((data) => {
        return new Promise(() => {
          delay(3000).then(() => {
            addFormElement.style.display = "flex";
            infoDownLoadElement.style.display = "none";
            inputName.value = "";
            inputText.value = "";
          });
        });
      });
  }
});

// событие на клик по кнопке "Удалить последний комментарий"

// const deleteLastComment = buttonDeleteLastComment.addEventListener(
//   "click",
//   () => {
//     let lastElement = arrayComments.pop();
//     renderListComments();
//   }
// );

// добавление, удаление лайков

function likeDislike() {
  const likeButtonElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      likeButtonElement.classList.toggle("-active-like");
      loadingLike = true;

      const index = likeButtonElement.dataset.index;
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
}

// отзыв к комметарию

function feedbackToComment() {
  const commentTextElements = document.querySelectorAll(".comment");

  for (const commentTextElement of commentTextElements) {
    const index = commentTextElement.dataset.index;
    commentTextElement.addEventListener("click", () => {
      inputText.value = `< ${arrayComments[index].commentText} (${arrayComments[index].name})`;
      renderListComments();
    });
  }
}

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
           <button class="add-form-button">Редактировать</button></div>
            <div class="likes">
              <span class="likes-counter">${comment.likesCounter}</span>
              <button data-index="${index}" class="like-button ${
        comment.isLike ? "-active-like" : ""
      } ${loadingLike ? "-loading-like" : ""}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  likeDislike();
  feedbackToComment();
}

function delay(interval = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

renderListComments();
