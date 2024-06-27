import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation";
import Movie from "./pages/Movie";
import MoviesCollection from "./pages/MoviesCollection";
import CreateCollection from "./pages/CreateCollection";
import Collections from "./pages/Collections";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/collections", element: <Collections /> },
      { path: "/collection/:id", element: <MoviesCollection /> },
      { path: "/movie/:id", element: <Movie /> },
      { path: "/create-collection", element: <CreateCollection /> },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
