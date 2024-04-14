import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../../utils/types";
import {
  getMoviesFromWatchList,
  removeMovieFromWatchList,
  setItem,
} from "../../utils/common";
import useAuth from "../../hooks/useAuth";
import MovieItem from "../../components/home/MovieItem";
import MoviesLayout from "../../components/home/MoviesLayout";
import CustomInput from "../../elements/CustomInput";
import CustomButton from "../../elements/CustomButton";
import { TbEdit } from "react-icons/tb";
import { showSnackbar } from "../../elements/Snackbar";

type MyListProps = {
  currentWatchList: string;
};

function MyList({ currentWatchList }: MyListProps): JSX.Element {
  const { user, userWatchList, updateUserWatchList } = useAuth();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [showInput, setShowInput] = useState(false);

  const getListName = () =>
    userWatchList.find((item) => item.id === currentWatchList)?.title;

  const [watchListName, setWatchListName] = useState(getListName);

  useEffect(() => {
    const list = getMoviesFromWatchList(user || "", currentWatchList);
    setMovies(list);
    setShowInput(false);
    setWatchListName(getListName);
  }, [currentWatchList, user]);

  const rename = () => {
    if (!watchListName) {
      showSnackbar("Please enter a watch list name");
      return;
    }
    const list = userWatchList.map((item) => {
      if (item.id === currentWatchList)
        return { ...item, title: watchListName };
      return item;
    });
    updateUserWatchList(list);
    setShowInput(false);
  };

  const removeFromList = useCallback(
    (movie: MovieType) => {
      const updatedData = removeMovieFromWatchList(user || "", movie);
      if (user) setItem(user, updatedData);
      const list = getMoviesFromWatchList(user || "", currentWatchList);
      setMovies(list);
    },
    [user, currentWatchList]
  );

  return (
    <div className="myList">
      {showInput ? (
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <CustomInput
            value={watchListName}
            style={{ width: 200 }}
            autoFocus
            onChange={(e) => setWatchListName(e.target.value)}
          />
          <CustomButton onClick={rename}>Rename</CustomButton>
        </div>
      ) : (
        <CustomButton
          className="textButton"
          style={{ display: "flex", alignItems: "center", gap: 20 }}
          onClick={() => setShowInput(true)}
        >
          <h1 className="h1">{watchListName}</h1>
          <TbEdit size={26} />
        </CustomButton>
      )}

      <MoviesLayout
        toogleWatchlist={removeFromList}
        movies={movies}
        isLoading={false}
        isMyList
      />
    </div>
  );
}

export default MyList;
