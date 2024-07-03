import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Collections() {
  const [collectionList, setCollectionList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCollectionList = localStorage.getItem("collectionList");
    if (storedCollectionList) {
      setCollectionList(JSON.parse(storedCollectionList));
    }
  }, []);

  const showMovies = (id) => {
    navigate(`/collection/${id}`);
  };

  return (
    <div className="collections">
      <Link to={"/create-collection"}>Create Collection</Link>
      <div>
        {collectionList.length > 0 ? (
          <ul>
            {collectionList.map((collection) => (
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
