import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { movieActions } from "../redux/MovieSlice";

export default function MoviesCollection() {
  const { id } = useParams();
  const [collectionList, setCollectionList] = useState(null);
  const dispatch = useDispatch();

  const collections = useSelector((state) => state.movie.collectionList);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const collections = localStorage.getItem("collectionList");

    if (collections) {
      const parsedCollections = JSON.parse(collections);
      const foundCollection = parsedCollections.find(
        (col) => col.id === parseInt(id)
      );
      setCollectionList(foundCollection);
    }
  }, [id, collections]);

  if (!collectionList) {
    return <p>Collection not found</p>;
  }

  const removeMovie = (movieId) => {
    dispatch(
      movieActions.removeMovie({
        movieId: movieId,
      })
    );
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
    <div className="collections">
      <h3>{collectionList.name}</h3>

      {collectionList.movies.length > 0 ? (
        <ul>
          {collectionList.movies.map((movie) => (
            <li key={movie.id}>
              <div>
                <p>{movie.title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  style={{ width: "200px" }}
                  onClick={() => movieDetails(movie.id)}
                />
              </div>
              <button onClick={() => removeMovie(movie.id)}> Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies in this collection</p>
      )}
    </div>
  );
}
