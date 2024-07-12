import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "../redux/MovieSlice";
import { useNavigate } from "react-router-dom";
import "./CreateCollections.css";

export default function CreateCollection() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() === "" || formData.description.trim() === "") {
      alert("Both title and description are required.");
      return;
    }
    dispatch(
      movieActions.saveCollection({
        title: formData.title,
        description: formData.description,
      })
    );
    setFormData({ title: "", description: "" });
    navigate(-1);
  };

  return (
    <div className="create-collection">
      <h2>Create your movies collection</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          placeholder="Enter a title"
          onChange={handleInputChange}
        />

        <label htmlFor=""></label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          placeholder="Enter a description"
          onChange={handleInputChange}
        />
        <button>Save</button>
      </form>
    </div>
  );
}
