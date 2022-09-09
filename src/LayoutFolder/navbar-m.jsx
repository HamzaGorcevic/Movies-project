import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateContext } from "../context";

export default function Navbar() {
  const [search, setSeach] = useState("");
  const [value, setValue] = useState("");
  const { setShareMovie, setType, type } = useContext(CreateContext);
  const [genre, setGenre] = useState([]);
  const [searchGenre, setSearchGenre] = useState([]);

  useEffect(() => {
    setGenre([]);
    axios
      .get(`https://imdb-api.com/en/API/${type}/k_1p4c9h6h/${search}`)
      .then((response) => {
        setShareMovie(response.data.results);
        setValue("");

        console.log(type, search);
      });
  }, [search, type]);

  useEffect(() => {
    console.log(search, "asdasdasdsada");

    setGenre([]);
    axios
      .get("https://imdb-api.com/API/AdvancedSearch/k_1p4c9h6h", {
        params: {
          genres: searchGenre + "",
        },
      })
      .then((res) => {
        setShareMovie(res.data.results);
      });
  }, [searchGenre]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light  bg-warning">
      <Link className="navbar-brand  text-success" to={"/"}>
        <h1 className="font-weight-bold">Home</h1>
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
          <button
            className="btn btn-danger m-2"
            onClick={() => {
              setType("SearchMovie");
            }}
          >
            Movies
          </button>
          <button
            className="btn btn-danger m-2"
            onClick={() => {
              setType("SearchSeries");
            }}
          >
            Series
          </button>

          <div className="">
            <select
              name=""
              id=""
              onChange={(option) => {
                setGenre((arr) => [...arr, option.target.value]);
              }}
            >
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="western">Western</option>
              <option value="war">War</option>
            </select>
            {genre ? (
              <Link
                className="btn btn-primary m-2"
                onClick={() => {
                  setSearchGenre(genre);
                }}
                to={"search"}
              >
                Search
              </Link>
            ) : (
              ""
            )}
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
            }}
            to={"search"}
            className="btn btn-success my-2 my-sm-0"
          >
            Search
          </Link>
        </form>
      </div>
    </nav>
  );
}
