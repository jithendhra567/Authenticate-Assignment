import React from "react";
import { getItem, getRequest } from "../utils/common";
import API_ENDPOINTS from "../utils/apiEndPoints";
import { MovieType, UserDetailsType } from "../utils/types";
import useAuth from "./useAuth";

const useMovieSearch = () => {
  const [data, setData] = React.useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { user } = useAuth();

  const searchMovies = async (text: string) => {
    setIsLoading(true);
    try {
      const url = API_ENDPOINTS.baseUrl + API_ENDPOINTS.search + text;
      const data = await getRequest(url);
      const { Search = [], Error: error } = data;
      if (error) {
        throw new Error(error);
      } else {
        const list = Search as MovieType[];
        updateMovieWatchList(list);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  const updateMovieWatchList = (list?: MovieType[]) => {
    const { movieMap = {} } = (getItem(user) as UserDetailsType) || {};
    const modedList = (list || data).map((movie) => {
      if (movieMap[movie.imdbID])
        return {
          ...movie,
          watchListName: movieMap[movie.imdbID],
        };
      return movie;
    });
    setData(modedList);
  };

  return { movies: data, isLoading, error, searchMovies, updateMovieWatchList };
};

export default useMovieSearch;
