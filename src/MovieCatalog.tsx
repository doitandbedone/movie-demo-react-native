import axios from 'axios';
import Movie from './Movie';
import * as secrets from '../secrets.json';

const config = {
  headers: {Authorization: `Bearer ${secrets.tmdbToken}`},
};
const baseURL = 'https://api.themoviedb.org/3';

const imageBaseURL = `https://image.tmdb.org/t/p/w500`;

type PaginatedMovies = {
  page: Number;
  results: any[];
  total_pages: Number;
  total_results: Number;
};

export async function getPopularMovies() {
  return getMoviesByEndpoint('/movie/popular');
}

export async function getTopRatedMovies() {
  return getMoviesByEndpoint('/movie/top_rated');
}

export async function getUpcomingMovies() {
  return getMoviesByEndpoint('/movie/upcoming');
}

export async function getNowPlayingMovies() {
  return getMoviesByEndpoint('/movie/now_playing');
}

async function getMoviesByEndpoint(endpoint: string): Promise<Movie[]> {
  const result: Movie[] = [];
  const pages = await fetchMoviePage(endpoint, undefined, 1);
  if (pages) {
    const movies = extractMovies(pages);
    result.push(...movies);
  }
  return result;
}

async function fetchMoviePage(
  endpoint: string,
  language: string = 'en_US',
  page: Number = 1,
): Promise<PaginatedMovies | undefined> {
  const url = `${baseURL}${endpoint}?language=${language}&page=${page}`;
  let res = await axios.get(url, config);
  if (res != undefined && res.status == 200) {
    const data: PaginatedMovies = res.data;
    return data;
  }
  return undefined;
}

function extractMovies(pages: PaginatedMovies): Movie[] {
  const result: Movie[] = [];
  const movies = pages.results;
  movies.forEach(movie => {
    result.push({
      title: movie.title as string,
      id: movie.id as Number,
      imageUrl: `${imageBaseURL}${movie.poster_path}`,
    });
  });
  return result;
}
