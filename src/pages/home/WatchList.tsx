import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../../utils/types";

function Watchlist(): JSX.Element {
  const [watchlist, setWatchlist] = useState<MovieType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // if (user && user.watchlist) {
    //   setWatchlist(user.watchlist);
    // }
  }, []);

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // localStorage.setItem("user", JSON.stringify({ ...user, watchlist }));
  }, [watchlist]);

  const handleRemoveFromWatchlist = (imdbID: string) => {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <div>
      <h2>Watchlist</h2>
      {watchlist.map((movie) => (
        <div key={movie.imdbID}>
          <img src={movie.poster} alt={movie.title} />
          <p>
            {movie.title} ({movie.year})
          </p>
          <button onClick={() => handleRemoveFromWatchlist(movie.imdbID)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
