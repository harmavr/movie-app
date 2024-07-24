import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles-components/Navigation.css";
import logo from "../assets/logo.jpg";

export default function Navigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </li>
          <li>
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/collections" className="nav-link">
              Collections
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
