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
    <main>
      <h1>Movie List</h1>
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





/*
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MovieList.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function MovieList() {



  const dispatch = useDispatch(); // 👮‍♂️ Lets us dispatch actions
  const movies = useSelector(store => store.movies); // 🎬 Selects movie list state

  useEffect(() => { // 🏁 Runs after component is displayed
    dispatch({ type: 'FETCH_MOVIES' }); // 🚀 Dispatches an action to fetch all movies
  }, []);

  // 👇 Here we render our component
  
    return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

  
  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {movies.map(movie => { // 👥 For each movie in our list...
          return (
            <div key={movie.id} >
              <Link to={`/details/${movie.id}`}> 🚪 Creates a link to that movie's detail page 
                <h3>{movie.title}</h3>
                <Item><img src={movie.poster} alt={movie.title}/></Item>
              </Link>
            </div>
          );
        })}
      </Grid>
    </Box>
      </section>
    </main>
  );
}

export default MovieList; // 🎁 Allows us to use this component in other files
*/