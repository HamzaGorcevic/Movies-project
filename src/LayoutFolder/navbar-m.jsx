import axios from "axios";
import { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateContext } from "../context";
import Multiselect from "multiselect-react-dropdown";

export default function Navbar() {
  const [active, setActive] = useState("movies");
  const options = [
    { name: "Action", id: 1 },
    { name: "Adventure", id: 2 },
    { name: "Comedy", id: 3 },
    { name: "Horror", id: 4 },
    { name: "Western", id: 5 },
    { name: "War", id: 6 },
    { name: "Spoty", id: 7 },
  ];
  const resetRef = useRef();
  const [optionsState] = useState(options);

  const [value, setValue] = useState("");
  const {
    setType,

    setSeach,
    genre,
    setGenre,

    setSearchGenre,

    setLoader,
  } = useContext(CreateContext);

  return (
    <nav
      className="bg-dark navbar navbar-expand-lg navbar-light"
      style={{ boxShadow: "2px 2px 10px #0d6efd" }}
    >
      <Link className="navbar-brand  text-light " to={"/"}>
        <h1
          className="font-weight-bold b p-1 rounded"
          style={{ background: "#D98514" }}
        >
          IMDB
        </h1>
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
          <Link
            to={"/"}
            className={`btn ${
              active == "movies" ? "btn-primary" : "btn-outline-primary"
            }  text-dark m-2`}
            onClick={() => {
              setActive("movies");
              setType("getPopularTVShows");
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className={`btn ${
              active == "series" ? "btn-primary" : "btn-outline-primary"
            } text-dark m-2`}
            onClick={() => {
              setActive("series");
              setType("getPopularMovies");
            }}
          >
            Series
          </Link>

          <div
            className="d-flex"
            style={{
              alignItems: "center",
            }}
          >
            <Multiselect
              style={{
                chips: {
                  background: "blue",
                },
                multiselectContainer: {
                  color: "orange",
                },
                searchBox: {
                  background: "white",
                  "border-radius": "10px",
                },
              }}
              onSearch={(value) => {
                setGenre([...genre, value]);
              }}
              options={optionsState}
              placeholder={"Chose your genre"}
              displayValue={"name"}
              onSelect={(event, index) => {
                setGenre((arr) => [...arr, index.name]);
              }}
              onRemove={(event, index) => {
                setGenre(genre.filter((el) => el !== index.name));
              }}
            />

            <Link
              className="btn btn-primary"
              style={{ height: 40, marginLeft: "5px" }}
              onClick={() => {
                setLoader(true);
                setSearchGenre(genre);
              }}
              to={"search"}
            >
              Search Genre
            </Link>
          </div>
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
              setLoader(true);
            }}
            to={"search"}
            className="btn btn-primary my-2 my-sm-0"
          >
            Search
          </Link>
        </form>
      </div>
    </nav>
  );
}
