import { likeDislike } from "./manageLikes.js";
import { feedbackToComment } from "./commentEditor.js";
import { arrayComments } from "./api.js";

const comments = document.querySelector(".comments");
let loadingLike = false;

export function renderListComments() {
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

  likeDislike(loadingLike);
  feedbackToComment();
}
