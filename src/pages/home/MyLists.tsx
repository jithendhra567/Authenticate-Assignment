import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../../utils/types";
import { getMoviesFromWatchList } from "../../utils/common";
import useAuth from "../../hooks/useAuth";
import MovieItem from "../../components/home/MovieItem";
import MoviesLayout from "../../components/home/MoviesLayout";

type MyListProps = {
  currentWatchList: string;
};

function MyList({ currentWatchList }: MyListProps): JSX.Element {
  const { user } = useAuth();
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const list = getMoviesFromWatchList(user || "", currentWatchList);
    setMovies(list);
  }, [currentWatchList, user]);

  return (
    <div className="myList">
      <MoviesLayout
        toogleWatchlist={() => {}}
        movies={movies}
        isLoading={false}
      />
    </div>
  );
}

export default MyList;
