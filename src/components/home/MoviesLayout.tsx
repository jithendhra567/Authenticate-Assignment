import React, { useRef, useState } from "react";
import { MovieType } from "../../utils/types";
import MovieItem from "./MovieItem";
import CustomModal from "../../elements/CustomModal";
import MovieDetails from "./MovieDetails";
import Skeleton from "../Skeleton";

type Props = {
  movies: MovieType[];
  isLoading: boolean;
  toogleWatchlist: (movie: MovieType) => void;
  isMyList?: boolean;
};

const MoviesLayout = (props: Props) => {
  const { isLoading, movies, toogleWatchlist, isMyList } = props;

  const [showDetails, setShowDetails] = useState(false);
  const activeMovie = useRef<MovieType | undefined>(undefined);

  const showDetailsHandler = (movie: MovieType) => {
    activeMovie.current = movie;
    setShowDetails(true);
  };

  if (isLoading) {
    return (
      <div className="movies">
        <Skeleton className="movieItem-loader" />
        <Skeleton className="movieItem-loader" />
        <Skeleton className="movieItem-loader" />
        <Skeleton className="movieItem-loader" />
        <Skeleton className="movieItem-loader" />
        <Skeleton className="movieItem-loader" />
        <Skeleton className="movieItem-loader" />
        <Skeleton className="movieItem-loader" />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="content">
        <p className="no-movies">
          {isMyList ? "No movies found" : "Search for your favorite movies"}
        </p>
      </div>
    );
  }

  return (
    <div className="movies">
      {movies.map((movie) => (
        <MovieItem
          onClick={showDetailsHandler}
          toggleWatchlist={toogleWatchlist}
          {...movie}
          key={movie.imdbID}
        />
      ))}
      <CustomModal visible={showDetails} onClose={setShowDetails}>
        {activeMovie.current && (
          <MovieDetails
            closeModal={() => setShowDetails(false)}
            movie={activeMovie.current}
          />
        )}
      </CustomModal>
    </div>
  );
};

export default React.memo(MoviesLayout);
