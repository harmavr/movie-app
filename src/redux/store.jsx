import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./MovieSlice";

const store = configureStore({
  reducer: { movie: movieSlice },
});

export default store;
