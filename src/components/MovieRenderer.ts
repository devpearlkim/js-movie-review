import { MovieModel } from "../types/type";

export function renderMoviesInitial(
  movieContainer: HTMLElement,
  movies: MovieModel[]
) {
  movieContainer.innerHTML = "";

  const movieGrid = document.createElement("div");
  if (!movieGrid) return;
  movieGrid.classList.add("movie-grid");

  const movieItemsHTML = movies
    .map(
      (movie) => `
      <div class="movie-item">
        <div class="item">
          <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${
            movie.poster_path
          }" alt="${movie.title}">
          <div class="item-desc">
            <p class="rate">
              <img class="star" src="./images/star_empty.png">
              <span>${movie.vote_average.toFixed(1)}</span>
            </p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  movieGrid.innerHTML = movieItemsHTML;
  movieContainer.appendChild(movieGrid);
}

export function appendMovies(
  movieContainer: HTMLElement,
  movies: MovieModel[]
) {
  const movieGrid = movieContainer.querySelector(".movie-grid");
  if (!movieGrid) return;

  const newItemsHTML = movies
    .map(
      (movie) => `
      <div class="movie-item">
        <div class="item">
          <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${
            movie.poster_path
          }" alt="${movie.title}">
          <div class="item-desc">
            <p class="rate">
              <img class="star" src="./images/star_empty.png">
              <span>${movie.vote_average.toFixed(1)}</span>
            </p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  movieGrid.insertAdjacentHTML("beforeend", newItemsHTML);
}

export function showSkeletonUI(movieContainer: HTMLElement) {
  const movieGrid = movieContainer.querySelector(".movie-grid");
  if (!movieGrid) return;

  const skeletonItems = Array.from({ length: 8 })
    .map(
      () => `
      <div class="movie-item skeleton">
        <div class="item">
          <div class="skeleton skeleton-thumbnail"></div>
          <div class="item-desc">
            <div class="skeleton-star-row">
              <div class="skeleton skeleton-star"></div>
              <p class="skeleton skeleton-rate"></p>
            </div>
            <div class="skeleton-title-row">
              <strong class="skeleton skeleton-title"></strong>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  movieGrid.insertAdjacentHTML("beforeend", skeletonItems);
}

export function removeSkeletonUI(movieContainer: HTMLElement) {
  const skeletonElements = movieContainer.querySelectorAll(
    ".movie-item.skeleton"
  );
  skeletonElements.forEach((el) => el.remove());
}
