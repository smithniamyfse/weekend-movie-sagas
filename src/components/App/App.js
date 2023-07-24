import { HashRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

// Importing components
import MovieList from "../MovieList/MovieList.jsx";
import MovieDetails from "../MovieDetails/MovieDetails.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch actions to fetch all movies and all genres when the app starts
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_GENRES" });
  }, [dispatch]);

  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}

export default App;
