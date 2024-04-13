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

// generate Id of lenght 10
export const generateId = (len = 10): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// debounce
export const debounce = (func: any, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

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

export const getMoviesFromWatchList = (user: string, watchListId: string) => {
  const details = getItem(user) as UserDetailsType || {};
  const { movieList = [] } = details;
  return movieList.filter((movie) => movie.watchListName === watchListId);
}