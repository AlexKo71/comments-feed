import { renderListComments } from "./renderTask.js";
import { arrayComments } from "./api.js";

export function likeDislike(loadingLike) {
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
