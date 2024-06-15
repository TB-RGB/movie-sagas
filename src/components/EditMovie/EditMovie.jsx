import { useSelector, useDispatch } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";

const EditMovie = () => {
  const movObj = useSelector((store) => store.currentMovie);
  const movGenres = movObj.genres;
  const genreList = useSelector((store) => store.genres);
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT", payload: id });
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const [newTitle, setNewTitle] = useState(movObj.title);
  const [newGenre, setNewGenre] = useState("");
  const [newDescription, setNewDescription] = useState(movObj.description);

  const updateMovie = () => {
    if (
      (newTitle === movObj.title && newDescription === movObj.description) ||
      newGenre === ""
    ) {
      alert("No Edits were made, must add a genre (for now :D)");
      return;
    } else {
      const editObject = {
        title: newTitle,
        description: newDescription,
        movie_id: id.id,
        genre_id: newGenre,
      };
      dispatch({ type: "UPDATE_MOVIE", payload: editObject });
      history.push(`/details/${id.id}`);
    }
  };

  const cancelEdit = () => {
    setNewTitle("");
    setNewDescription("");
    setNewGenre("");
    history.push(`/details/${id.id}`);
  };

  return (
    <>
      <h1>{!newTitle ? movObj.title : newTitle}</h1>
      <input
        type="text"
        value={!newTitle ? movObj.title : newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <br />
      <img src={movObj.poster} alt={newTitle} />
      <h3>Genres</h3>
      {movGenres ? (
        movGenres.map((type) => <div key={type.name}>{type.name}</div>)
      ) : (
        <div>Loading genres :D</div>
      )}
      <select
        name="Genres"
        onChange={(event) => setNewGenre(event.target.value)}
        value={newGenre}
      >
        <option value="">--Pick A Genre--</option>
        {genreList.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <br />
      <div>{!newDescription ? movObj.description : newDescription}</div>
      <textarea
        name="editDescription"
        value={!newDescription ? movObj.description : newDescription}
        onChange={(event) => setNewDescription(event.target.value)}
      ></textarea>
      <br />
      <button onClick={() => updateMovie()}>Save Edit</button>
      <button onClick={() => cancelEdit()}>Cancel Edit</button>
    </>
  );
};

export default EditMovie;
