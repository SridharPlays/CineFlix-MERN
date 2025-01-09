import React from "react";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const handleMovieClick = (movieId) => {
    navigate(`/movie-info/${movieId}`);
  };
	return (
		<div>
            <div className="movie" onClick={() => handleMovieClick(movie._id)} >
                <img src={`./MovieBanner/${movie.image_loc}`} alt={movie.name} />
                <h1>{movie.name}</h1> 
                <p>{movie.language}</p> 
                <p>{movie.format}</p>
            </div>
        </div>
	);
};

export default MovieCard;