import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateContext } from "../context";

export default function Navbar() {
  const [search, setSeach] = useState("");
  const [value, setValue] = useState("");
  const { setShareMovie, setType, type } = useContext(CreateContext);

  useEffect(() => {
    axios
      .get(`https://imdb-api.com/en/API/${type}/k_j1hexm69/${search}`)
      .then((response) => {
        setShareMovie(response.data.results);
        setValue("");
      });
  }, [search, type]);

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
              <button
                onClick={() => {
                  setType("SearchMovie");
                }}
              >
                Movies
              </button>
              <button
                onClick={() => {
                  setType("SearchSeries");
                }}
              >
                Series
              </button>

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
            value={value}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <Link
            onClick={() => {
              setSeach(value);
            }}
            to={"search"}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Search
          </Link>
        </form>
      </div>
    </nav>
  );
}
