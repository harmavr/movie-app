import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: null,
  isModalOpen: false,
  collectionList: JSON.parse(localStorage.getItem("collectionList")) || [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action) {
      const { collectionId, movie } = action.payload;
      const collection = state.collectionList.find(
        (col) => col.id === parseInt(collectionId)
      );
      if (collection) {
        collection.movies.push(movie);
        localStorage.setItem(
          "collectionList",
          JSON.stringify(state.collectionList)
        );
      }
    },
    setMovieDetails(state, action) {
      state.selectedMovie = action.payload;
      state.isModalOpen = true;
    },
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
      state.isModalOpen = false;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedMovie = null;
    },
    saveCollection(state, action) {
      const newCollection = {
        id: state.collectionList.length + 1,
        name: action.payload.title,
        description: action.payload.description,
        movies: [],
      };
      state.collectionList.push(newCollection);
      localStorage.setItem(
        "collectionList",
        JSON.stringify(state.collectionList)
      );
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
