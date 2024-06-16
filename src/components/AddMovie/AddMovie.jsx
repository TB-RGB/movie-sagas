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

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const postMovie = () => {
    if (
      newUrl === "" ||
      newDescription === "" ||
      newGenre === "" ||
      newName === ""
    ) {
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
    history.push("/");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Movie Title"
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
        className="input input-bordered input-primary w-full max-w-xs my-1 mt-52"
      />
      <br />
      <input
        type="text"
        placeholder="Image url"
        value={newUrl}
        onChange={(event) => setNewUrl(event.target.value)}
        className="input input-bordered input-secondary w-full max-w-xs my-1"
      />
      <br />
      <textarea
        name="Description"
        placeholder="Description"
        value={newDescription}
        onChange={(event) => setNewDescription(event.target.value)}
        className="textarea textarea-info w-80 my-1"
      ></textarea>
      <br />
      <select
        name="Genres"
        onChange={(event) => setNewGenre(event.target.value)}
        value={newGenre}
        className="select select-accent w-full max-w-xs my-1"
      >
        <option disabled value="">--Pick A Genre--</option>
        {genres.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <br />
      <button className="group relative" onClick={() => cancelAdd()}>
        <div className="relative z-10 inline-flex h-10 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-error px-6 font-medium text-neutral-950 transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-active:translate-x-0 group-active:translate-y-0">
          Cancel
        </div>
        <div className="absolute inset-0 z-0 h-full w-full rounded-md transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none"></div>
      </button>
      <button
        onClick={() => postMovie()}
        className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-success px-6 m-3 font-medium text-neutral-950 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]"
      >
        Save Movie
      </button>
    </>
  );
};

export default AddMovie;
