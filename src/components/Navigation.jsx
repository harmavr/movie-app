import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home" className="nav-link">
              Home Page
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
