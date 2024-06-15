import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Details = () => {
  const movObj = useSelector((store) => store.currentMovie);
  const movGenres = movObj.genres;
  const history = useHistory()

  return (
    <>
      <h1 data-testid="movieDetails">{movObj.title}</h1>
      <br />
      <img src={movObj.poster} alt="" />
      <h3>Genres</h3>
      {movGenres ? (
        movGenres.map((type) => <div key={type.name}>{type.name}</div>)
      ) : (
        <div>Loading genres...</div>
      )}
      <br />
      <div>{movObj.description}</div>
      <br />
      <button onClick={()=>history.push('/')} data-testid="toList">Back to List</button>
    </>
  );
};

export default Details;
