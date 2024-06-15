import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

const AddMovie = () => {
  const genres = useSelector((store) => store.genres);
  const [newUrl, setNewUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    dispatch({ type: 'FETCH_GENRES'})
  }, [])

  const postMovie = () => {
    if (newUrl === '' || newDescription === '' || newGenre === '' || newName === "") {
      alert("All Fields must be filled :)");
      return;
    } else {
      const movieObject = {
        title: newName,
        poster: newUrl,
        description: newDescription,
        genre_id: newGenre,
      };
      dispatch({ type: "ADD_MOVIE", payload: movieObject });
      history.push("/");
    }
  };

  const cancelAdd = () => {
    setNewDescription("");
    setNewGenre("");
    setNewName("");
    setNewUrl("");
    history.push('/')
  };

  return (
    <>
      <input
        type="text"
        placeholder="Movie Title"
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Image url"
        value={newUrl}
        onChange={(event) => setNewUrl(event.target.value)}
      />
      <br />
      <textarea
        name="Description"
        placeholder="Description"
        value={newDescription}
        onChange={(event) => setNewDescription(event.target.value)}
      ></textarea>
      <br />
      <select
        name="Genres"
        onChange={(event) => setNewGenre(event.target.value)}
        value={newGenre}
      >
        <option value="">--Pick A Genre--</option>
        {genres.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={()=>cancelAdd()}>Cancel</button>
      <button onClick={() => postMovie()}>Save Movie</button>
    </>
  );
};

export default AddMovie;
