import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieStore } from "../../store/movieStore";
import "./MovieInfo.css";

const MovieInfo = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const { getMovie, movie } = useMovieStore();

  useEffect(() => {
    // Fetch the movie data when the component mounts
    getMovie(id);
  }, [id, getMovie]);

  useEffect(() => {
    if (movie) {
      setMovieInfo(movie); // Update the state when the store movie changes
    }
  }, [movie]); // This effect runs whenever 'movie' from the store is updated

  if (!movieInfo) return <div>Loading...</div>;

  const { name, age_rating, image_loc, language, genre, imdb_rating, story, director, writer, stars } = movieInfo;

  return (
    <div className="infoCard">
      <header>
        <h2>
          {name} -{" "}
          <abbr title={age_rating}>{age_rating}</abbr>
        </h2>
      </header>

      <div className="wrapper">
        <div className="image-container">
          <img src={`../MovieBanner/${image_loc}`} alt={name} />
        </div>
        <div className="content">
          <p id="languageValue">Languages: {language}</p>
          <p>{genre}</p>
          <p>Rating: {imdb_rating}</p>
          <p className="story">Story: {story}</p>
          <p>Director: {director}</p>
          <p>Writer: {writer}</p>
          <p>Stars: {stars.join(", ")}</p>
          <button className="book-now">Book Now!</button>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
