import { MovieType, UserDetailsType } from "./types"

// get method using fetch
export const getRequest = async (url: string, headers?: any) => {
  const res = await fetch(url, {
    method: 'GET',
    headers,
  })
  return res.json()
}

// post method using fetch
export const postRequest = async (url: string, body: any, headers?: any) => {
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  return res.json()
}

// get item from local storage
export const getItem = (key?: string) => {
  try{
    const item = localStorage.getItem(key || '');
    if (item) return JSON.parse(item);
    return null;
  } catch(err) {
    return null;
  }
}

// set item in local storage
export const setItem = (key: string, value: any) => {
  try{
    localStorage.setItem(key, JSON.stringify(value));
  } catch(err) {
    console.log(err);
  }
}

export const addMovieToWatchList = (user: string, movie: MovieType) => {
  const details = getItem(user) as UserDetailsType || {};
  const { movieList = [], movieMap = {} } = details;
  const moddedList = movieList.filter(
    (item) => item.imdbID !== movie.imdbID
  );
  movieMap[movie.imdbID] = movie.watchListName;
  moddedList.unshift(movie);
  return { ...details, movieList: moddedList, movieMap };
};

export const removeMovieFromWatchList = (user: string, movie: MovieType) => {
  const details = getItem(user) as UserDetailsType || {};
  const { movieList = [], movieMap = {} } = details;
  const moddedList = movieList.filter(
    (item) => item.imdbID !== movie.imdbID
  );
  delete movieMap[movie.imdbID];
  return { ...details, movieList: moddedList, movieMap };
}

export const getMoviesFromWatchList = (user: string, watchListName: string) => {
  const details = getItem(user) as UserDetailsType || {};
  const { movieList = [] } = details;
  return movieList.filter((movie) => movie.watchListName === watchListName);
}