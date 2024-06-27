// src/components/Movie.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { movieActions } from "../redux/MovieSlice";
import Modal from "../components/Modal";

const Movie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.movie.isModalOpen);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const collectionsList = useSelector((state) => state.movie.collectionList);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
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

  const closeModal = () => {
    dispatch(movieActions.closeModal());
    navigate(-1);
  };

  const handleCollectionChange = (e) => {
    setSelectedCollectionId(e.target.value);
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
      console.log(collectionsList);
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
