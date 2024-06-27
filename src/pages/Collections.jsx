import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Collections() {
  const collectionMovies = useSelector((state) => state.movie.collectionList);
  const navigate = useNavigate();

  const showMovies = (id) => {
    navigate(`/collection/${id}`);
  };

  return (
    <div className="collections">
      <Link to={"/create-collection"}>Create Collection</Link>
      <div>
        {collectionMovies.length > 0 ? (
          <ul>
            {collectionMovies.map((collection) => (
              <li key={collection.id}>
                <p onClick={() => showMovies(collection.id)}>
                  {collection.name}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No collections available</p>
        )}
      </div>
    </div>
  );
}
