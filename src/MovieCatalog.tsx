import axios from 'axios';
import Movie from './Movie';
import * as secrets from '../secrets.json';

const config = {
  headers: {Authorization: `Bearer ${secrets.tmdbToken}`},
};
const baseURL = 'https://api.themoviedb.org/3';

const imageBaseURL = `https://image.tmdb.org/t/p/w500`;

const defaultLanguage = 'en_US';

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
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
    });
  });
  return result;
}

type VideosResponse = {
  id: string;
  results: VideoItem[];
};

export type VideoItem = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: Number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
};

export async function getVideos(movieId: string): Promise<VideoItem[]> {
  const url = `${baseURL}/movie/${movieId}/videos?language=${defaultLanguage}`;
  try {
    let res = await axios.get(url, config);
    if (res != undefined && res.status == 200) {
      const videoResponse: VideosResponse = res.data;
      return videoResponse?.results ?? [];
    }
  } catch (e) {
    console.log(`Error while fetching movie videos: ${e}`);
  }
  return [];
}
