import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.css";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, [dispatch]);

  return (
    <main className="movie-list-container">
      <h1 className="h1-movie-list">Movie &nbsp; List</h1>
      <section className="movies">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2} 
            columns={{ xs: 4, sm: 6, md: 12 }}
          >
            {movies.map((movie) => (
              <Grid item xs={4} sm={4} md={4} key={movie.id}> 
                <MovieItem movie={movie} /> 
              </Grid>
            ))}
          </Grid>
        </Box>
      </section>
    </main>
  );
}

export default MovieList;





