import { useSelector, useDispatch } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

const Details = () => {
  const movObj = useSelector((store) => store.currentMovie);
  const movGenres = movObj.genres;
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams();

  console.log("useParams id", id);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_CURRENT", payload: id });
  }, []);

  return (
    <>
      <div data-testid="movieDetails">
        <div className="flex items-center justify-center mt-5">
          <div className="card w-96 bg-gray-800 shadow-xl">
            <div className="card-body items-center text-center">
              <h1 className="card-title">{movObj.title}</h1>
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
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => history.push(`/edit/${movObj.movie_id}`)}
                >
                  Edit Movie
                </button>
              </div>
            </div>
          </div>
       
       
        <div className="flex items-center text-center justify-center mx-3">
        <div className="prose sm:prose-base">{movObj.description}</div>
        </div>
        </div>
        <br />
        <button className="btn btn-secondary" onClick={() => history.push("/")} data-testid="toList">
          Back to List
        </button>
      </div>
    </>
  );
};

export default Details;
