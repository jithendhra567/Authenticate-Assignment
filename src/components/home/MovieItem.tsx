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
    <div className="movieItem">
      <CustomButton
        className="textButton bookmark"
        onClick={toggleWatchlistHandler}
      >
        {isWatchlisted ? (
          <BsBookmarkDashFill size={40} color="orange" />
        ) : (
          <BsBookmarkPlusFill size={40} color="#0099FF" />
        )}
      </CustomButton>
      <CustomButton onClick={onClickHandler} className="textButton container">
        {Poster !== "N/A" ? (
          <CustomImage
            src={Poster}
            className="moviePoster"
            alt="Movie Poster"
          />
        ) : (
          <div className="noPoster">No Poster</div>
        )}
        <div className="movieDetails">
          <CustomText className="movieTitle">{Title}</CustomText>
          <div className="movieInfo">
            <CustomText className="movieType">{Type}</CustomText>
            <CustomText className="movieYear">{Year}</CustomText>
          </div>
        </div>
      </CustomButton>
    </div>
  );
}

export default React.memo(MovieItem);
