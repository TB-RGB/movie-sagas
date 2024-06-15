import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

const Details = () => {
  const movObj = useSelector((store) => store.currentMovie);
  const movGenres = movObj.genres;
  const history = useHistory()
  const dispatch = useDispatch()
  const id = useParams()

  console.log('useParams id', id)

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    dispatch({type: 'FETCH_CURRENT', payload: id})
  }, []);

  return (
    <>
    <div data-testid="movieDetails">
      <h1>{movObj.title}</h1>
      <button onClick={()=>history.push(`/edit/${movObj.movie_id}`)}>Edit Movie</button>
      <br />
      <img src={movObj.poster} alt={movObj.title} />
      <h3>Genres</h3>
      {movGenres ? (
        movGenres.map((type) => <div key={type.name}>{type.name}</div>)
      ) : (
        <div>Loading genres :D</div>
      )}
      <br />
      <div>{movObj.description}</div>
      <br />
      <button onClick={()=>history.push('/')} data-testid="toList">Back to List</button>
      </div>
    </>
  );
};

export default Details;
