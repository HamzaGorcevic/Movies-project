import axios from "axios";
import { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateContext } from "../context";
import Multiselect from "multiselect-react-dropdown";

export default function Navbar() {
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
  console.log(genre, "genre");

  return (
    <nav className="navbar navbar-expand-lg navbar-light  bg-warning">
      <Link className="navbar-brand  text-success" to={"/"}>
        <h1 className="font-weight-bold bg-danger">Imdb</h1>
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
            className="btn btn-danger m-2"
            onClick={() => {
              setType("SearchMovie");
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="btn btn-danger m-2"
            onClick={() => {
              setType("SearchSeries");
            }}
          >
            Series
          </Link>

          <div className="d-flex">
            <Multiselect
              style={{
                chips: {
                  background: "red",
                },
                multiselectContainer: {
                  color: "orange",
                },
                searchBox: {
                  border: "none",
                  "border-bottom": "1px solid blue",
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
              className="btn btn-primary m-2"
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
