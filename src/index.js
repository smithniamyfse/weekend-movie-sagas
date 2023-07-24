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

/*
Reducer: 🛠️ (a tool that constructs the state of your app)
Action: 📬 (a message sent to the reducer)
State: 🏠 (the house that the reducer is building)
*/

// In your movie app, think of your state as the information or data 
// about all the movies, the genres, and the movie details. 
// It's like the inventory of your movie store.

// 👇 We're setting up the saga middleware, it's a middleman that helps manage side effects in our app
const sagaMiddleware = createSagaMiddleware();

/*
Reducers 🛠️:

movies - Handles information about all movies in the app.
genres - Handles information about all genres.
movieDetails - Handles information about a specific movie's details.
*/

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

/*
Actions 📬:

SET_MOVIES - Tells the movies reducer to update its state with the list of all movies.
SET_GENRES - Tells the genres reducer to update its state with the list of all genres.
SET_MOVIE_DETAILS - Tells the movieDetails reducer to update its state with the details of a specific movie.
*/

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

/*
Imagine you (the action 📬) want to see the details of a specific movie. 
You tell the reducer 🛠️ (in this case, movieDetails), "Hey, I want the details for Movie A."

The reducer looks at its current state (maybe it currently has details for Movie B), 
takes your request, and fetches the details for Movie A from the server (it "buys" the new movie details, if you will).

The reducer then returns this new state (details for Movie A), which is then displayed on your app's UI.

So, your state (🏠 - the movie details displayed on your app) 
changed based on your action (📬 - your request for a specific movie's details), 
thanks to the reducer (🛠️ - the function that handles your request and updates the state).
*/

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

