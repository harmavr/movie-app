import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <ul>
        <li>
          <Link to="/home">Home Page</Link>
        </li>
        <li>
          <Link to="/collections">Collections</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
