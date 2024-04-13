import React, { useCallback, useRef, useState } from "react";
import useMovieSearch from "../../hooks/useMovieSearch";
import CustomInput from "../../elements/CustomInput";
import MovieItem from "../../components/home/MovieItem";
import { MovieType, UserDetailsType } from "../../utils/types";
import { showSnackbar } from "../../elements/Snackbar";
import useAuth from "../../hooks/useAuth";
import {
  getItem,
  addMovieToWatchList,
  setItem,
  removeMovieFromWatchList,
} from "../../utils/common";
import CustomModal from "../../elements/CustomModal";
import WatchListSelection from "../../components/home/WatchListSelection";

const SearchMovies = () => {
  const { movies, isLoading, searchMovies, updateMovieWatchList } =
    useMovieSearch();
  const { user } = useAuth();

  const activeMovie = useRef<MovieType | undefined>(undefined);
  const [showSelectWatchlist, setShowSelectWatchlist] = useState(false);

  const handleSearch = (text: string) => {
    if (text.length > 3) searchMovies(text);
    showSnackbar(text);
  };

  const showDetails = useCallback((movie: MovieType) => {
    console.log(movie);
  }, []);

  const toogleWatchlist = useCallback((movie: MovieType) => {
    const isAlredyWatchlisted = Boolean(movie.watchListName);
    if (isAlredyWatchlisted) {
      const updatedData = removeMovieFromWatchList(user || "", movie);
      if (user) setItem(user, updatedData);
      updateMovieWatchList();
      return;
    }
    activeMovie.current = movie;
    setShowSelectWatchlist(true);
  }, []);

  const updateMovieList = (watchList: string) => {
    if (!activeMovie.current) return;
    activeMovie.current.watchListName = watchList;
    const updatedData = addMovieToWatchList(user || "", activeMovie.current);
    if (user) setItem(user, updatedData);
    setShowSelectWatchlist(false);
    updateMovieWatchList();
  };

  return (
    <div>
      <CustomInput
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Movies"
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {movies.map((movie) => (
            <MovieItem
              onClick={showDetails}
              toggleWatchlist={toogleWatchlist}
              {...movie}
            />
          ))}
        </div>
      )}
      <CustomModal
        visible={showSelectWatchlist}
        onClose={setShowSelectWatchlist}
      >
        <WatchListSelection selectionHandler={updateMovieList} />
      </CustomModal>
    </div>
  );
};

export default SearchMovies;
