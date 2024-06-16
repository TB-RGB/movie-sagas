import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
    const history = useHistory()
  return (
    <>
    <div className="flex items-center justify-center">
      <div className="navbar bg-accent text-primary-content">
        <div className="navbar-center">
        <button
          onClick={() => history.push("/")}
          className="btn btn-ghost text-xl"
        >
          Movies Saga!
        </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Header;
