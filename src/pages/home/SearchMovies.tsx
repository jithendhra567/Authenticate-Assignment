import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useMovieSearch from "../../hooks/useMovieSearch";
import CustomInput from "../../elements/CustomInput";
import MovieItem from "../../components/home/MovieItem";
import { MovieType, UserDetailsType } from "../../utils/types";
import { showSnackbar } from "../../elements/Snackbar";
import useAuth from "../../hooks/useAuth";
import { BsBookmarkPlusFill, BsBookmarkDashFill } from "react-icons/bs";
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
import CustomText from "../../elements/CustomText";

type Props = {
  movies: MovieType[];
  isLoading: boolean;
  updateMovieWatchList: () => void;
  searchMovies: (text: string) => void;
};

const SearchMovies = (props: Props) => {
  const { movies, isLoading, updateMovieWatchList, searchMovies } = props;

  const { user, toggleSideBar } = useAuth();

  const activeMovie = useRef<MovieType | undefined>(undefined);
  const [showSelectWatchlist, setShowSelectWatchlist] = useState(false);

  const searchText = useRef("");

  useEffect(() => {
    updateMovieWatchList();
  }, []);

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
      showSnackbar("Movie removed from watchlist", "success");
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
    showSnackbar("Movie Added to watchlist", "success");
  };

  const onSearch = () => {
    if (isLoading) return;
    searchMovies(searchText.current);
  };

  const renderHeader = useMemo(
    () => (
      <div className="searchHeader">
        <div className="searchHeaderContent">
          <CustomText className="h1">Welcome, {user}!</CustomText>
          <CustomButton className="myListBtn" onClick={toggleSideBar}>
            My Watch List
          </CustomButton>
        </div>
        <CustomText style={{ marginTop: 10 }}>
          Search and add Movies to WatchList, but clicking on bookmark{" "}
          <BsBookmarkPlusFill size={20} color="#0099FF" />. Create and delete
          multiple watchList and add Movies to any of them.
        </CustomText>
      </div>
    ),
    [user]
  );

  return (
    <div className="search">
      {renderHeader}
      <div className="searchBar">
        <CustomInput
          autoFocus
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Movies"
        />
        <CustomButton onClick={onSearch}>
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
