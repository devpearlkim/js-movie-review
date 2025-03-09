import { Header } from "../components/Header";
import { IMovieService } from "../types/type";

export const updateTabContainer = (mode: "category" | "search"): void => {
  const tabContainer = document.getElementById("tab-container");
  if (!tabContainer) return;
  tabContainer.style.display = mode === "search" ? "none" : "block";
};

export const resetSearchInput = (): void => {
  const inputEl = document.querySelector(
    ".search-input"
  ) as HTMLInputElement | null;
  if (inputEl) inputEl.value = "";
};

export const setSearchInput = (query: string): void => {
  const inputEl = document.querySelector(
    ".search-input"
  ) as HTMLInputElement | null;
  if (inputEl) inputEl.value = query;
};

export const updateHeader = (service: IMovieService): void => {
  const firstMovie = service.getFirstMovie();
  if (firstMovie) {
    Header()?.update({
      title: firstMovie.title,
      rating: firstMovie.getFormattedVote(),
      backdrop: firstMovie.getBackdropUrl(),
    });
  }
};
