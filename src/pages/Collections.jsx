import React, { useEffect, useState } from "react";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import DeleteForever from "@mui/icons-material/DeleteForever";

import { Link, useNavigate } from "react-router-dom";
import "../styles-pages/Collections.css";
import { useDispatch } from "react-redux";
import { movieActions } from "../redux/MovieSlice";

export default function Collections() {
  const [collectionList, setCollectionList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCollectionList = localStorage.getItem("collectionList");
    if (storedCollectionList) {
      setCollectionList(JSON.parse(storedCollectionList));
    }
  }, []);

  const showMovies = (id) => {
    navigate(`/collection/${id}`);
  };

  const deleteMovie = (id) => {
    dispatch(movieActions.removeCollection({ collectionId: id }));
  };

  return (
    <div className="collections">
      <Link to={"/create-collection"}>Create Collection</Link>
      <div>
        {collectionList.length > 0 ? (
          <ul>
            {collectionList.map((collection) => (
              <li className="collection-item-container" key={collection.id}>
                <span
                  className="collection-item"
                  onClick={() => showMovies(collection.id)}
                >
                  {collection.name}
                </span>
                <Chip
                  key={collection.id}
                  endDecorator={
                    <ChipDelete onClick={() => deleteMovie(collection.id)}>
                      <DeleteForever className="delete-icon" />
                    </ChipDelete>
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-collections">No collections available</p>
        )}
      </div>
    </div>
  );
}
