import { MovieModel } from "../types/type";

export function renderMoviesInitial(
  movieContainer: HTMLElement,
  movies: MovieModel[]
) {
  movieContainer.innerHTML = "";

  const movieGrid = document.createElement("div");
  movieGrid.classList.add("movie-grid");

  movieGrid.innerHTML = movies.map(movieTemplate).join("");

  movieContainer.appendChild(movieGrid);
}

export function appendMovies(
  movieContainer: HTMLElement,
  movies: MovieModel[]
) {
  const movieGrid = movieContainer.querySelector(".movie-grid");
  if (!movieGrid) return;

  movieGrid.insertAdjacentHTML("beforeend", movies.map(movieTemplate).join(""));
}

export function showSkeletonUI(movieContainer: HTMLElement) {
  const movieGrid = movieContainer.querySelector(".movie-grid");
  if (!movieGrid) return;

  movieGrid.insertAdjacentHTML("beforeend", generateSkeletons(8));
}

export function removeSkeletonUI(movieContainer: HTMLElement) {
  movieContainer
    .querySelectorAll(".movie-item.skeleton")
    .forEach((el) => el.remove());
}

function movieTemplate(movie: MovieModel): string {
  return `
    <div class="movie-item">
      <div class="item" data-movie-id="${movie.id}">
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
  `;
}

function generateSkeletons(count: number): string {
  return Array.from({ length: count })
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
}
