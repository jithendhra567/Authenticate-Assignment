import React, { useState } from "react";
import { MovieType } from "../../utils/types";
import CustomText from "../../elements/CustomText";
import useMovieDetails from "../../hooks/useMovieDetails";
import CustomImage from "../../elements/CustomImage";
import CustomButton from "../../elements/CustomButton";
import { IoMdClose } from "react-icons/io";

type Props = {
  movie: MovieType;
  closeModal: () => void;
};

const MovieDetails = ({ movie, closeModal }: Props) => {
  const { movieDetails, isLoading } = useMovieDetails(movie.imdbID || "");

  const renderDetails = (title: string, value: string) => {
    return (
      <div key={title} className="detailsItem">
        <CustomText style={{ fontWeight: "bold" }}>{title}:</CustomText>{" "}
        <CustomText>{value}</CustomText>
      </div>
    );
  };

  return (
    <div className="details">
      <CustomImage className="image" src={movie?.Poster} alt={movie?.Title} />
      {isLoading && (
        <div className="loaderContainer" style={{ width: "20vw", height: 300 }}>
          <div className="loader" style={{ width: 80, padding: 10 }} />
        </div>
      )}
      {movieDetails && (
        <div className="detailsContent">
          <CustomText className="h1">{movie?.Title} </CustomText>
          <CustomText className="desc">{movieDetails?.Plot}</CustomText>
          <div>
            {renderDetails("Genre", movieDetails?.Genre)}
            {renderDetails("Rated", movieDetails?.Rated)}
            {renderDetails("Released", movieDetails?.Released)}
            {renderDetails("Runtime", movieDetails?.Runtime)}
            {renderDetails("Language", movieDetails?.Language)}
            {renderDetails("Country", movieDetails?.Country)}
            {renderDetails("Awards", movieDetails?.Awards)}
            {renderDetails("Metascore", movieDetails?.Metascore)}
            {renderDetails("imdbRating", movieDetails?.imdbRating)}
            {renderDetails("imdbVotes", movieDetails?.imdbVotes)}
            {renderDetails("BoxOffice", movieDetails?.BoxOffice)}
            {renderDetails("Production", movieDetails?.Production)}
          </div>
        </div>
      )}
      <CustomButton className="close textButton" onClick={closeModal}>
        <IoMdClose />
      </CustomButton>
    </div>
  );
};

export default MovieDetails;
