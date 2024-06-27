import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function MoviesCollection() {
  const { id } = useParams();
  const collections = useSelector((state) => state.movie.collectionList);
  const collection = collections.find((col) => col.id === parseInt(id));

  if (!collection) {
    return <p>Collection not found</p>;
  }
  return (
    <div className="collections">
      <h3>{collection.name}</h3>

      {collection.movies.length > 0 ? (
        <ul>
          {collection.movies.map((movie) => (
            <li key={movie.id}>
              <div>
                <p>{movie.title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  style={{ width: "200px" }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies in this collection</p>
      )}
    </div>
  );
}
