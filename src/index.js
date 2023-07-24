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
