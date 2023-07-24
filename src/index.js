// 👇 We're importing libraries and components that we need to create our app
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

// 👇 We're setting up the saga middleware, it's a middleman that helps manage side effects in our app
const sagaMiddleware = createSagaMiddleware();

// 👇 Here we create a reducer function that updates our movie list state when we get new movie data
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES": // 🎬🔄 If we get new movie data, update the state with it
      return action.payload;
    default:
      return state;
  }
};

// 👇 Here we create a reducer function that updates our genre list state when we get new genre data
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES": // 🏷️🔄 If we get new genre data, update the state with it
      return action.payload;
    default:
      return state;
  }
};

// 👇 Here we create a reducer function that updates our movie detail state when we get new detail data
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS": // 📝🔄 If we get new detail data, update the state with it
      return action.payload;
    default:
      return state;
  }
};

// 👇 Here we create functions that get data from our server
function* fetchGenres() { // 🏷️🔄 Get all genres from server
  try {
    const genres = yield axios.get("/api/genre"); // 🚀 Send request to server
    yield put({ type: "SET_GENRES", payload: genres.data }); // 💽 If successful, save the data to our genre list state
  } catch {
    console.log("get all genres error"); // 💥 Log any errors
  }
}

function* fetchAllMovies() { // 🎬🔄 Get all movies from server
  try {
    const movies = yield axios.get("/api/movie"); // 🚀 Send request to server
    yield put({ type: "SET_MOVIES", payload: movies.data }); // 💽 If successful, save the data to our movie list state
  } catch {
    console.log("get all error"); // 💥 Log any errors
  }
}

function* fetchMovieDetails(action) { // 📝🔄 Get movie details from server
  try {
    const response = yield axios.get(`/api/movie/${action.payload}`); // 🚀 Send request to server
    yield put({ type: "SET_MOVIE_DETAILS", payload: response.data }); // 💽 If successful, save the data to our movie detail state
  } catch {
    console.log("get details error"); // 💥 Log any errors
  }
}

// 👇 rootSaga watches for actions and triggers the appropriate functions to handle them
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies); // 👀 If an action to fetch all movies is dispatched, run the fetchAllMovies function
  yield takeEvery("FETCH_GENRES", fetchGenres); // 👀 If an action to fetch all genres is dispatched, run the fetchGenres function
  yield takeEvery("FETCH_MOVIE_DETAILS", fetchMovieDetails); // 👀 If an action to fetch movie details is dispatched, run the fetchMovieDetails function
}

// 👇 Here we create a store to manage our app's state using the reducers and middleware we defined
const storeInstance = createStore(
  combineReducers({
    movies, // 🎬 The state of our movie list
    genres, // 🏷️ The state of our genre list
    movieDetails, // 📝 The state of our movie details
  }),
  applyMiddleware(sagaMiddleware, logger) // Apply the middleware to our store
);

// 👇 We tell the saga middleware to start watching for actions
sagaMiddleware.run(rootSaga);

// 👇 Finally, we render our app to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);




/*
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Redux reducers

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the selected movie details
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// Worker sagas

function* fetchGenres() {
    try {
      const genres = yield axios.get("/api/genre");
      console.log("get all:", genres.data);
      yield put({ type: "SET_GENRES", payload: genres.data });
    } catch {
      console.log("get all genres error");
    }
  }
  

function* fetchAllMovies() {
  try {
    const movies = yield axios.get("/api/movie");
    console.log("get all:", movies.data);
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch {
    console.log("get all error");
  }
}

function* fetchMovieDetails(action) {
  try {
    const response = yield axios.get(`/api/movie/${action.payload}`);
    console.log("get details:", response.data);
    yield put({ type: "SET_MOVIE_DETAILS", payload: response.data });
  } catch {
    console.log("get details error");
  }
}

// rootSaga
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_GENRES", fetchGenres);
  yield takeEvery("FETCH_MOVIE_DETAILS", fetchMovieDetails);

}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

// Run the rootSaga
sagaMiddleware.run(rootSaga);

// Render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);
*/
