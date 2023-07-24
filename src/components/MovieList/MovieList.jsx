import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
  const dispatch = useDispatch(); // 👮‍♂️ Lets us dispatch actions
  const movies = useSelector(store => store.movies); // 🎬 Selects movie list state

  useEffect(() => { // 🏁 Runs after component is displayed
    dispatch({ type: 'FETCH_MOVIES' }); // 🚀 Dispatches an action to fetch all movies
  }, []);

  // 👇 Here we render our component
  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => { // 👥 For each movie in our list...
          return (
            <div key={movie.id} >
              <Link to={`/details/${movie.id}`}> {/* 🚪 Creates a link to that movie's detail page */}
                <h3>{movie.title}</h3>
                <img src={movie.poster} alt={movie.title}/>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList; // 🎁 Allows us to use this component in other files



/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <Link to={`/details/${movie.id}`}>
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title}/>
                            </Link>
                        </div>
                    );
                })}
            </section>
        </main>
    );
}

export default MovieList;

*/
