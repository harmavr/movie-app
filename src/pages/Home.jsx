import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { movieActions } from "../redux/MovieSlice";
import Pagination from "../components/Pagination";
import "./Home.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_API_KEY;

  const validate = (keyword) => {
    let validationError = "";
    if (keyword.length < 3) {
      validationError = "Must be at least 3 characters long.";
    } else if (!/^[a-zA-Z0-9]+$/.test(keyword)) {
      validationError = "Only alphanumeric characters are allowed.";
    }
    setError(validationError);
    return validationError === "";
  };

  const inputHandler = (event) => {
    const query = event.target.value;
    setInput(query);
    setKeyword(query);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (validate(keyword)) {
      setCurrentPage(1);
      await fetchMovies(keyword, 1, resultsPerPage);
    }
  };

  const fetchMovies = async (query, page, resultsPerPage) => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setMoviesList(data.results.slice(0, resultsPerPage) || []);
      setTotalPages(Math.ceil(data.total_results / resultsPerPage));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchMovies(keyword, newPage, resultsPerPage);
  };

  const handleResultsPerPageChange = (event) => {
    const newResultsPerPage = parseInt(event.target.value, 10);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(1);
    fetchMovies(keyword, 1, newResultsPerPage);
  };

  const movieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      dispatch(movieActions.setMovieDetails(data));
      navigate(`/movie/${id}`);
    } catch (error) {
      console.error("Error fetching movie details: ", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          onChange={inputHandler}
          placeholder="Search for movies"
        />
        <button type="submit">Search</button>
        {error && <div className="error">{error}</div>}
      </form>

      <div className="results-per-page">
        <label htmlFor="resultsPerPage">Results per page: </label>
        <select
          id="resultsPerPage"
          value={resultsPerPage}
          onChange={handleResultsPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      {moviesList.length > 0 && (
        <div>
          <h2>Movie Results</h2>
          <div className="movie-list">
            {moviesList.map((movie) => (
              <div
                key={movie.id}
                className="movie-item"
                onClick={() => movieDetails(movie.id)}
              >
                <h3>{movie.title}</h3>
                <p>Vote Average: {movie.vote_average}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
