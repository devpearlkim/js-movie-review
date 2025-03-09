import { STORAGE_KEYS } from "../constants";
import { UserRating } from "../types/type";

export const getUserRating = (movieId: number): UserRating | null => {
  const storedRatings: Record<number, UserRating> = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.USER_RATINGS) || "{}"
  );

  return storedRatings[movieId] || null;
};

export const setUserRating = (movieId: number, score: number): void => {
  const storedRatings: Record<number, UserRating> = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.USER_RATINGS) || "{}"
  );

  storedRatings[movieId] = {
    movieId,
    score,
    ratedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEYS.USER_RATINGS,
    JSON.stringify(storedRatings)
  );
};
