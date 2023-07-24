import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function MovieDetails() {
  const dispatch = useDispatch(); // 👮‍♂️ Lets us dispatch actions
  const history = useHistory(); // ⏳ Lets us access the history instance
  const movieDetails = useSelector((state) => state.movieDetails); // 📝 Selects movie detail state
  const { id } = useParams(); // 🔗 Gets movie id from url parameters 

  useEffect(() => { // 🏁 Runs after component is displayed
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id }); // 🚀 Dispatches an action to fetch movie details
  }, [dispatch, id]);

  // 👇 Here we render our component
  return (
    <div>
      {movieDetails.title && <h2>{movieDetails.title}</h2>} {/* 📋 Displays movie title if it exists */}
      {movieDetails.poster && <img src={movieDetails.poster} alt={movieDetails.title}/>} {/* 🖼️ Displays movie poster if it exists */}
      {movieDetails.description && <p>{movieDetails.description}</p>} {/* 🗒️ Displays movie description if it exists */}
      {movieDetails.genres && (
        <ul>
          {movieDetails.genres.map((genre, index) => ( // 👥 For each genre in our list...
            <li key={index}>{genre}</li> // 👩‍🌾 ...create a list item for that genre
          ))}
        </ul>
      )}
      <button onClick={() => history.push("/")}>Back to List</button> {/* 🚪 Button to go back to list */}
    </div>
  );
}

export default MovieDetails; // 🎁 Allows us to use this component in other files
