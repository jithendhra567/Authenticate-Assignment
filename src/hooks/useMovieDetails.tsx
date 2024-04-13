import React, { useEffect } from "react";
import { MovieDetailsType } from "../utils/types";
import API_ENDPOINTS from "../utils/apiEndPoints";
import { getRequest } from "../utils/common";

const useMovieDetails = (id: string) => {
  const [movieDetails, setMovieDetails] =
    React.useState<MovieDetailsType | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const getMovieDetails = async (movieId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = API_ENDPOINTS.baseUrl + API_ENDPOINTS.movieDetails + movieId;
      const data = await getRequest(url);
      setMovieDetails(data);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMovieDetails(id);
  }, [id]);

  return { isLoading, movieDetails, getMovieDetails, error };
};

export default useMovieDetails;
