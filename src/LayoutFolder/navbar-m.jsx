import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateContext } from "../context";

export default function Navbar() {
  const [search, setSeach] = useState("");
  const [value, setValue] = useState("");
  const { setShareMovie } = useContext(CreateContext);
  useEffect(() => {
    axios
      .get(`https://imdb-api.com/en/API/SearchMovie/k_j1hexm69${`/${search}`}`)
      .then((response) => {
        setShareMovie(response.data.results);
      });
  }, [search]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to={"/"}>
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <Link
            to={"search"}
            onClick={() => {
              setSeach(value);
            }}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Search
          </Link>
        </form>
      </div>
    </nav>
  );
}
