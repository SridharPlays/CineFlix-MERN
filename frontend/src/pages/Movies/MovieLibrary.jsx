import { React, useEffect, useState } from "react";
import "./MovieLibrary.css";
import { useMovieStore } from "../../store/movieStore";
import MovieCard from "../../components/MovieCard";
import Select from "react-select";

const MovieLibrary = () => {
    const { fetchMovies, movies } = useMovieStore();
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("");
    const [type, setType] = useState("");
    const [genre, setGenre] = useState("");
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const languageOptions = [
        { label: "English", value: "English" },
        { label: "Tamil", value: "Tamil" },
        { label: "Telugu", value: "Telugu" },
        { label: "Hindi", value: "Hindi" },
        { label: "Kannada", value: "Kannada" },
        { label: "Malayalam", value: "Malayalam" },
        { label: "Japanese", value: "Japanese" },
        { label: "Korean", value: "Korean" },
    ];

    const formatOptions = [
        { label: "2D", value: "2D" },
        { label: "3D", value: "3D" },
        { label: "IMAX 2D", value: "IMAX 2D" },
        { label: "IMAX 3D", value: "IMAX 3D" },
        { label: "4DX", value: "4DX" },
    ];

    const genreOptions = [
        { label: "Action", value: "Action" },
        { label: "Adventure", value: "Adventure" },
        { label: "Animation", value: "Animation" },
        { label: "Comedy", value: "Comedy" },
        { label: "Crime", value: "Crime" },
        { label: "Drama", value: "Drama" },
        { label: "Fantasy", value: "Fantasy" },
        { label: "History", value: "History" },
        { label: "Horror", value: "Horror" },
        { label: "Romance", value: "Romance" },
        { label: "Sci-Fi", value: "Sci-Fi" },
        { label: "Thriller", value: "Thriller" },
    ];

    const selectButtonStyles = {
        control: (provided) => ({
            ...provided,
            width: "280px",
            borderRadius: "12px",
            boxShadow: "0 0 0 1.5px #2b2c37, 0 0 25px -17px #000",
            textAlign: "left",
            padding: "3px",
            outline: "none",
            border: "none",
            backgroundColor: "#16171d",
            color: "#bdbecb",
            paddingLeft: "30px",
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "#bdbecb",
            backgroundColor: state.isSelected ? "lightblue" : "#16171d",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#bdbecb",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#bdbecb",
        }),
        input: (provided) => ({
            ...provided,
            color: "#bdbecb",
        }),
    };

    const filteredMovies = movies.filter((movie) => {
        return (
            (search === "" ||
                movie.name.toLowerCase().includes(search.toLowerCase())) &&
            (language === "" ||
                movie.language.toLowerCase().includes(language.toLowerCase())) &&
            (type === "" || movie.format === type) &&
            (genre === "" || movie.genre.toLowerCase().includes(genre.toLowerCase()))
        );
    });

    const reset = () => {
        setSearch("");
        setLanguage(null);
        setType(null);
        setGenre(null);
    };

    return (
        <div className="bg-black">
            <div className="sort-ribbon">
                <div className="input-box">
                    <svg
                        id="search-btn"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="search-icon">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        id="search-query"
                        className="search-btn"
                        type="search"
                        placeholder="Search Movie"
                        name="searchbar" />
                </div>
                <div className="lang-options" id="languageOptions">
                    <div className="input-box">
                        <svg
                            id="search-btn"
                            aria-hidden="true"
                            className="search-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="32"
                                d="M48 112h288M192 64v48M272 448l96-224 96 224M301.5 384h133M281.3 112S257 206 199 277 80 384 80 384"
                            />
                            <path
                                d="M256 336s-35-27-72-75-56-85-56-85"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                        </svg>
                        <Select
                            onChange={(selectedOption) => setLanguage(selectedOption?.value)}
                            placeholder={"Languages"}
                            value={language}
                            options={languageOptions}
                            styles={selectButtonStyles}
                        />
                    </div>
                </div>
                <div className="format-options" id="formatOptions">
                    <div className="input-box">
                        <svg
                            id="search-btn"
                            aria-hidden="true"
                            className="search-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                d="M432 112V96a48.14 48.14 0 00-48-48H64a48.14 48.14 0 00-48 48v256a48.14 48.14 0 0048 48h16"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="96"
                                y="128"
                                width="400"
                                height="336"
                                rx="45.99"
                                ry="45.99"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <ellipse
                                cx="372.92"
                                cy="219.64"
                                rx="30.77"
                                ry="30.55"
                                fill="none"
                                stroke="currentColor"
                                stroke-miterlimit="10"
                                stroke-width="32"
                            />
                            <path
                                d="M342.15 372.17L255 285.78a30.93 30.93 0 00-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0141.46-1.87L496 402.91"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                        </svg>
                        <Select
                            onChange={(selectedOption) => setType(selectedOption?.value)}
                            placeholder="Screen Type"
                            options={formatOptions}
                            styles={selectButtonStyles}
                            value={type}
                        />
                    </div>
                </div>
                <div className="genre-options" id="genreOptions">
                    <div className="input-box">
                        <svg
                            id="search-btn"
                            aria-hidden="true"
                            className="search-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <rect
                                x="384"
                                y="336"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="384"
                                y="256"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="384"
                                y="176"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="384"
                                y="96"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="48"
                                y="336"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="48"
                                y="256"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="48"
                                y="176"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="48"
                                y="96"
                                width="80"
                                height="80"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="128"
                                y="96"
                                width="256"
                                height="160"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                            <rect
                                x="128"
                                y="256"
                                width="256"
                                height="160"
                                rx="28"
                                ry="28"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="32"
                            />
                        </svg>
                        <Select
                            onChange={(selectedOption) => setGenre(selectedOption?.value)}
                            placeholder="Genre"
                            options={genreOptions}
                            value={genre}
                            styles={selectButtonStyles}
                        />
                    </div>
                </div>
                <div className="input-box reset-btn">
                    <button onClick={reset}>Clear Filters</button>
                </div>
            </div>

            <section className="movies-catalogue">
                <div className="catalogue-header">
                </div>
                <div className="movies">
                    {filteredMovies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MovieLibrary;
