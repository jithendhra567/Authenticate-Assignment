import React from "react";
import SearchMovies from "./SearchMovies";
import CustomText from "../../elements/CustomText";
import Sidebar from "../../components/home/Sidebar";
import { useSearchParams } from "react-router-dom";
import { CONTS } from "../../utils/constants";
import MyList from "./MyLists";
import CustomButton from "../../elements/CustomButton";
import useAuth from "../../hooks/useAuth";
import "./home.css";
import useMovieSearch from "../../hooks/useMovieSearch";

const Home = () => {
  const [urlSearchParams] = useSearchParams();
  const { toggleSideBar } = useAuth();

  const { movies, isLoading, searchMovies, updateMovieWatchList } =
    useMovieSearch();

  const currentWatchList = urlSearchParams.get(CONTS.WATCH_LIST);
  return (
    <div className="home">
      <Sidebar />
      {currentWatchList ? (
        <MyList currentWatchList={currentWatchList} />
      ) : (
        <SearchMovies
          movies={movies}
          isLoading={isLoading}
          searchMovies={searchMovies}
          updateMovieWatchList={updateMovieWatchList}
        />
      )}
      <div onClick={toggleSideBar} className="sidebar-overlay" />
    </div>
  );
};

export default Home;
