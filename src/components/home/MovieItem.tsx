import React, { useState, useEffect } from "react";
import { MovieType } from "../../utils/types";
import CustomText from "../../elements/CustomText";
import { BsBookmarkPlusFill, BsBookmarkDashFill } from "react-icons/bs";
import CustomButton from "../../elements/CustomButton";
import CustomImage from "../../elements/CustomImage";

type Props = {
  onClick: (movie: MovieType) => void;
  toggleWatchlist: (movie: MovieType) => void;
} & MovieType;

function MovieItem(props: Props): JSX.Element {
  const {
    Title,
    Year,
    imdbID,
    Type,
    Poster,
    watchListName,
    toggleWatchlist,
    onClick,
  } = props;

  const isWatchlisted = Boolean(watchListName);

  const movie = {
    Title,
    Year,
    imdbID,
    Type,
    Poster,
    watchListName,
  };

  const toggleWatchlistHandler = () => {
    toggleWatchlist(movie);
  };

  const onClickHandler = () => {
    onClick(movie);
  };

  return (
    <div>
      <CustomButton onClick={toggleWatchlistHandler}>
        {isWatchlisted ? <BsBookmarkDashFill /> : <BsBookmarkPlusFill />}
      </CustomButton>
      <CustomButton onClick={onClickHandler}>
        <CustomImage src={Poster} alt="Movie Poster" />
        <CustomText>{Title}</CustomText>
      </CustomButton>
    </div>
  );
}

export default React.memo(MovieItem);
