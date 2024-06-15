import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './MovieList.css';

function MovieList() {

  const history = useHistory()
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const imgClick = (id)=>{
    dispatch({type: 'FETCH_CURRENT', payload: {id: id}})
    history.push(`/details/${id}`)
  }

  return (
    <main>
      <h1>MovieList</h1>
      <button onClick={()=>history.push('/addMovie')}>Add a Movie!</button>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img onClick={()=>imgClick(movie.id)} src={movie.poster} alt={movie.title} data-testid="toDetails"/>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
