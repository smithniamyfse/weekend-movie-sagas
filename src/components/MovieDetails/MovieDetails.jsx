import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function MovieDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movieDetails = useSelector(state => state.movieDetails);
  const { id } = useParams(); // get movie ID from route parameters

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: id });
  }, [dispatch, id]);




return (





<button onClick={() => history.push('/')}>Back to List</button>
);

}
