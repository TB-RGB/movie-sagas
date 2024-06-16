import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./MovieList.css";

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  const imgClick = (id) => {
    dispatch({ type: "FETCH_CURRENT", payload: { id: id } });
    history.push(`/details/${id}`);
  };

  return (
    <main>
      
      <button
        onClick={() => history.push("/addMovie")}
        className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white font-medium m-3"
      >
        <div className="inline-flex h-12 translate-y-0 items-center justify-center px-6 text-neutral-950 transition duration-500 group-hover:-translate-y-[150%]">
          Add a Movie!
        </div>
        <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-neutral-950 transition duration-500 group-hover:translate-y-0">
          <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-info transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
          <span className="z-10">Add a Movie!</span>
        </div>
      </button>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div
              data-testid="movieItem"
              key={movie.id}
              className="m-3 card card-compact w-64 bg-base-100 shadow-xl"
            >
              <div className="card-body items-center text-center">
              <h3 className="card-title">{movie.title}</h3>
              </div>
              <figure>
              <img
                onClick={() => imgClick(movie.id)}
                src={movie.poster}
                alt={movie.title}
                data-testid="toDetails"
              />
              </figure>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
