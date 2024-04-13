import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../../utils/types";
import { getMoviesFromWatchList } from "../../utils/common";
import useAuth from "../../hooks/useAuth";
import MovieItem from "../../components/home/MovieItem";

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
    <div>
      <h2>{currentWatchList}</h2>
      <div>
        {movies.map((movie) => (
          <MovieItem
            onClick={() => {}}
            toggleWatchlist={() => {}}
            key={movie.imdbID}
            {...movie}
          />
        ))}
      </div>
    </div>
  );
}

export default MyList;