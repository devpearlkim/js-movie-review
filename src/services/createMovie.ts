import { MovieApiDto, MovieModel } from "../types/type";

export function createMovie(data: MovieApiDto): MovieModel {
  const {
    id,
    title,
    poster_path,
    vote_average,
    backdrop_path,
    release_date,
    genres,
    overview,
  } = data;

  function getThumbnailUrl(): string {
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  }

  function getBackdropUrl(): string {
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`;
  }

  function getFormattedVote(): string {
    return vote_average.toFixed(1);
  }

  function getYear(): string {
    return release_date ? release_date.split("-")[0] : "Unknown";
  }

  function getGenres(): string {
    return genres?.map((genre) => genre.name).join(", ") || "";
  }

  function getOverview(): string {
    return overview || "상세 정보 없음.";
  }

  return {
    id,
    title,
    poster_path,
    vote_average,
    backdrop_path,
    release_date,
    genres,
    overview,
    getThumbnailUrl,
    getBackdropUrl,
    getFormattedVote,
    getYear,
    getGenres,
    getOverview,
  };
}
