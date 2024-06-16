import { Route, HashRouter as Router } from "react-router-dom";
import MovieList from "../MovieList/MovieList";
import "./App.css";
import "./build.css";
import Details from "../Details/Details";
import AddMovie from "../AddMovie/AddMovie";
import EditMovie from "../EditMovie/EditMovie";
import Header from "../Header/Header";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id">
          <Details />
        </Route>

        {/* Add Movie page */}
        <Route path="/addMovie">
          <AddMovie />
        </Route>

        {/* Edit Movie Page */}
        <Route path="/edit/:id">
          <EditMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
