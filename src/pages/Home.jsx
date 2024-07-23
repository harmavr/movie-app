import React from "react";
import homeImage from "../assets/home-backround.jpg";
import "../styles-pages/Home.css";
export default function Home() {
  return (
    <div className="home-container">
      <img src={homeImage} alt="" />
      <h1>Welcome to the movie app</h1>
    </div>
  );
}
