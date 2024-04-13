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
  debounce,
} from "../../utils/common";
import CustomModal from "../../elements/CustomModal";
import WatchListSelection from "../../components/home/WatchListSelection";
import MoviesLayout from "../../components/home/MoviesLayout";
import CustomButton from "../../elements/CustomButton";

const SearchMovies = () => {
  const { movies, isLoading, searchMovies, updateMovieWatchList } =
    useMovieSearch();
  const { user } = useAuth();

  const activeMovie = useRef<MovieType | undefined>(undefined);
  const [showSelectWatchlist, setShowSelectWatchlist] = useState(false);

  const searchText = useRef("");

  const handleSearch = debounce((text: string) => {
    searchText.current = text;
    if (text.length > 2) searchMovies(text);
  }, 500);

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

  const updateMovieList = (watchListId: string) => {
    if (!activeMovie.current) return;
    activeMovie.current.watchListName = watchListId;
    const updatedData = addMovieToWatchList(user || "", activeMovie.current);
    if (user) setItem(user, updatedData);
    setShowSelectWatchlist(false);
    updateMovieWatchList();
  };

  return (
    <div className="search">
      <div className="searchBar">
        <CustomInput
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Movies"
        />
        <CustomButton onClick={() => searchMovies(searchText.current)}>
          {isLoading ? (
            <div
              className="loader"
              style={{ background: "white", width: 20, padding: 4 }}
            />
          ) : (
            "Search"
          )}
        </CustomButton>
      </div>
      <MoviesLayout
        movies={movies}
        isLoading={isLoading}
        toogleWatchlist={toogleWatchlist}
      />
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
