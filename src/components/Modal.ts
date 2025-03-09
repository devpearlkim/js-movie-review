import { createMovie } from "../services/createMovie";
import { MovieModel } from "../types/type";

export function Modal() {
  let modalElement: HTMLElement | null = null;

  function createModalTemplate() {
    const template = document.createElement("div");
    template.innerHTML = `
      <div class="modal-background">
        <div class="modal">
          <button class="close-modal">&times;</button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="" alt="Movie Poster">
            </div>
            <div class="modal-description">
              <h2></h2>
              <p class="category"></p>
              <p class="detail"></p>
            </div>
          </div>
        </div>
      </div>
    `;
    return template.firstElementChild as HTMLElement;
  }

  function render() {
    if (!modalElement) {
      modalElement = createModalTemplate();
      document.body.appendChild(modalElement);

      const closeButton = modalElement.querySelector(".close-modal");
      closeButton?.addEventListener("click", close);

      modalElement.addEventListener("click", (e) => {
        if (e.target === modalElement) close();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      });
    }
  }

  function open(movieData: MovieModel) {
    if (!modalElement) return;

    const movie = createMovie(movieData);

    modalElement.querySelector("h2")!.textContent = movie.title;
    modalElement.querySelector(
      ".category"
    )!.textContent = `${movie.getFormattedVote()} · ${movie.getBackdropUrl()}`;
    const imageEl = modalElement.querySelector(
      ".modal-image img"
    ) as HTMLImageElement;
    if (imageEl) {
      imageEl.src = movie.getThumbnailUrl();
    }

    modalElement.querySelector(".detail")!.textContent = movie.title;

    modalElement.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function close() {
    modalElement?.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  return { render, open, close };
}
