import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MoviesCollection() {
  const { id } = useParams();
  const [collectionList, setCollectionList] = useState(null);

  useEffect(() => {
    const collections = localStorage.getItem("collectionList");

    if (collections) {
      const parsedCollections = JSON.parse(collections);
      const foundCollection = parsedCollections.find(
        (col) => col.id === parseInt(id)
      );
      setCollectionList(foundCollection);
    }
  }, [id]);

  if (!collectionList) {
    return <p>Collection not found</p>;
  }
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
