import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { movieActions } from "../redux/MovieSlice";
import Modal from "../components/Modal";
import { Rating, Typography } from "@mui/material";
import "./Movie.css";

const Movie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.movie.isModalOpen);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const [collectionsList, setCollectionList] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [login, setLogin] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [guestSessionId, setGuestSessionId] = useState("");
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
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
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }

    return () => {
      dispatch(movieActions.setSelectedMovie(null));
    };
  }, [id, dispatch, API_KEY]);

  useEffect(() => {
    const colList = JSON.parse(localStorage.getItem("collectionList"));
    setCollectionList(colList);
  }, []);

  const closeModal = () => {
    dispatch(movieActions.closeModal());
    navigate(-1);
  };

  const handleCollectionChange = (e) => {
    setSelectedCollectionId(e.target.value);
  };

  const handleLoginAsAGuest = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setGuestSessionId(data.guest_session_id);
      setLogin(data.success);
      console.log(data.guest_session_id, data.success);
    } catch (error) {
      console.error("Error fetching movie details: ", error);
    }
  };

  const handleRateMovie = async (value) => {
    if (!guestSessionId) {
      console.error("Guest session ID is missing.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({ value }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setRatingValue(value);
        console.log("Rating submitted successfully:", data);
      } else {
        console.error("Rating failed: ", data);
      }
    } catch (error) {
      console.error("Error fetching movie details: ", error);
    }
  };

  const addToCollection = () => {
    if (selectedCollectionId && selectedMovie) {
      dispatch(
        movieActions.setMovies({
          collectionId: selectedCollectionId,
          movie: selectedMovie,
        })
      );
      dispatch(movieActions.setSelectedMovie(null));
      dispatch(movieActions.closeModal());
      navigate(-1);
    } else {
      alert("Please select a collection and a movie");
    }
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal} className="movie-modal">
      {selectedMovie ? (
        <div>
          <h2>{selectedMovie.title}</h2>
          <ul>
            <li>{selectedMovie.overview}</li>
            <li>Budget: {selectedMovie.budget}</li>
            <li>Release Date: {selectedMovie.release_date}</li>
            <li>Revenue: {selectedMovie.revenue}</li>
            <li>Vote Average: {selectedMovie.vote_average}</li>
            <li>Vote Count: {selectedMovie.vote_count}</li>
            <li>
              Languages:{" "}
              {selectedMovie.spoken_languages
                .map((language) => language.english_name)
                .join(", ")}
            </li>
          </ul>

          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={`${selectedMovie.title} poster`}
            style={{ width: "200px" }}
          />
          <div className="rate">
            {!login ? (
              <button onClick={handleLoginAsAGuest}>login as a Guest</button>
            ) : (
              <div className="rating">
                <Typography component="legend">Rate the movie</Typography>
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    handleRateMovie(newValue);
                  }}
                />
              </div>
            )}
          </div>
          <label htmlFor="collections">Select a collection:</label>
          <select
            id="collections"
            value={selectedCollectionId}
            onChange={handleCollectionChange}
          >
            <option value="" disabled>
              Select a collection
            </option>
            {collectionsList.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
          <button onClick={() => addToCollection(selectedMovie)}>
            Add to Collection
          </button>
          <button onClick={closeModal}>Close</button>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </Modal>
  );
};

export default Movie;
