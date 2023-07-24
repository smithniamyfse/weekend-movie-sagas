import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function MovieDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movieDetails = useSelector((state) => state.movieDetails);
  const { id } = useParams(); 

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id });
  }, [dispatch, id]);

  return (
    <div>
      {movieDetails.title && <h2>{movieDetails.title}</h2>}
      {movieDetails.poster && <img src={movieDetails.poster} alt={movieDetails.title}/>}
      {movieDetails.description && <p>{movieDetails.description}</p>}
      {movieDetails.genres && (
        <ul>
          {movieDetails.genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      )}
      <button onClick={() => history.push("/")}>Back to List</button>
    </div>
  );
}

export default MovieDetails;
