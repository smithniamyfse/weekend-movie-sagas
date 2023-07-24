import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger"; 
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

/*
Reducer: 🛠️ (a tool that constructs the state of your app)
Action: 📬 (a message sent to the reducer)
State: 🏠 (the house that the reducer is building) 
    State in this app is the information or data all about the movies, the genres, and the movie details. 
*/


const sagaMiddleware = createSagaMiddleware();

/*
Reducers 🛠️:
movies - Handles information about all movies in the app.
genres - Handles information about all genres.
movieDetails - Handles information about a specific movie's details.
*/

// Reducer that updates the movie list state when new movie data is
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES": // 🎬🔄 If we get new movie data, update the state with it
      return action.payload;
    default:
      return state;
  }
};

// Reducer that updates the genre list state when new genre data is get
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES": // 🏷️🔄 If we get new genre data, update the state with it
      return action.payload;
    default:
      return state;
  }
};

// Reducer that updates the movie detail state when new detail data is get
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS": // 📝🔄 If we get new detail data, update the state with it
      return action.payload;
    default:
      return state;
  }
};

/*
Actions 📬:
SET_MOVIES - Tells the movies reducer to update its state with the list of all movies.
SET_GENRES - Tells the genres reducer to update its state with the list of all genres.
SET_MOVIE_DETAILS - Tells the movieDetails reducer to update its state with the details of a specific movie.
*/

// Functions that get data from the server
function* fetchGenres() { // 🏷️🔄 Get all genres from server
  try {
    const genres = yield axios.get("/api/genre"); // 🚀 Send request to server
    yield put({ type: "SET_GENRES", payload: genres.data }); 
  } catch {
    console.log("get all genres error");
  }
}

function* fetchAllMovies() { // 🎬🔄 Get all movies from server
  try {
    const movies = yield axios.get("/api/movie"); // 🚀 Send request to server
    yield put({ type: "SET_MOVIES", payload: movies.data }); 
  } catch {
    console.log("get all error");
  }
}

function* fetchMovieDetails(action) { // 📝🔄 Get movie details from server
  try {
    const response = yield axios.get(`/api/movie/${action.payload}`); // 🚀 Send request to server
    yield put({ type: "SET_MOVIE_DETAILS", payload: response.data }); 
  } catch {
    console.log("get details error"); 
  }
}

// rootSaga watches for actions and triggers the appropriate functions to handle them
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies); // 👀 If an action to fetch all movies is dispatched, run the fetchAllMovies function
  yield takeEvery("FETCH_GENRES", fetchGenres); // 👀 If an action to fetch all genres is dispatched, run the fetchGenres function
  yield takeEvery("FETCH_MOVIE_DETAILS", fetchMovieDetails); // 👀 If an action to fetch movie details is dispatched, run the fetchMovieDetails function
}


const storeInstance = createStore(
  combineReducers({
    movies, 
    genres, 
    movieDetails, 
  }),
  applyMiddleware(sagaMiddleware, logger)
);


sagaMiddleware.run(rootSaga);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);

