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
      <div className="flex items-center justify-center mt-5 mb-3">
        <div className="card w-96 bg-gray-800 shadow-xl">
          <div className="card-body items-center text-center">
            <h1 className="card-title">
              {!newTitle ? movObj.title : newTitle}
            </h1>
            <input
              type="text"
              value={!newTitle ? movObj.title : newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              className="input input-bordered input-info w-full max-w-xs"
            />
            <figure>
              <img src={movObj.poster} alt={movObj.title} />
            </figure>
            <h3>Genres</h3>
            <div className="join">
              {movGenres ? (
                movGenres.map((type) => (
                  <span key={type.name} className="btn join-item">
                    {type.name}
                  </span>
                ))
              ) : (
                <div>Loading genres :D</div>
              )}
            </div>
            <select
              name="Genres"
              onChange={(event) => setNewGenre(event.target.value)}
              value={newGenre}
              className="select select-accent w-full max-w-xs my-1"
            >
              <option disabled value="">
                --Pick A Genre--
              </option>
              {genreList.map((genre) => (
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="prose sm:prose-base">
          {!newDescription ? movObj.description : newDescription}
        </div>
      </div>
      <textarea
        name="editDescription"
        value={!newDescription ? movObj.description : newDescription}
        onChange={(event) => setNewDescription(event.target.value)}
        className="textarea textarea-info w-full h-40 my-1"
      ></textarea>
      <br />
      <button className="btn btn-error" onClick={() => cancelEdit()}>
        Cancel Edit
      </button>
      <button className="btn btn-accent mx-2" onClick={() => updateMovie()}>
        Save Edit
      </button>
    </>
  );
};

export default EditMovie;
