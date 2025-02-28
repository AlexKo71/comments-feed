const addCommentFormElement = document.querySelector("#addCommentForm");

function renderAddCommentForm() {
  addCommentFormElement.innerHTML = `<input
          type="text"
          name="name"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button add-button">Написать</button>
        </div>`;
}

export { addCommentFormElement, renderAddCommentForm };
