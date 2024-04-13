import React, { useRef, useState } from "react";
import { MovieType } from "../../utils/types";
import MovieItem from "./MovieItem";
import CustomModal from "../../elements/CustomModal";
import MovieDetails from "./MovieDetails";

type Props = {
  movies: MovieType[];
  isLoading: boolean;
  toogleWatchlist: (movie: MovieType) => void;
};

const MoviesLayout = (props: Props) => {
  const { isLoading, movies, toogleWatchlist } = props;

  const [showDetails, setShowDetails] = useState(false);
  const activeMovie = useRef<MovieType | undefined>(undefined);

  const showDetailsHandler = (movie: MovieType) => {
    activeMovie.current = movie;
    setShowDetails(true);
  };

  if (isLoading) {
    return (
      <div className="movies">
        <div>Loading...</div>
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
