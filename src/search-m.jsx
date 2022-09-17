import { useContext, useEffect, useRef, useState } from "react";
import { CreateContext } from "./context";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function SearchMovie() {
  let searching = useRef();
  let genres = useRef();

  const {
    setShareId,

    search,
    type,
    searchGenre,

    setSeach,
  } = useContext(CreateContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(true);

  genres.current = searchGenre;
  searching.current = search;

  useEffect(() => {
    genres.current = [];
    console.log("klkl puta");
    if (searching.current !== "") {
      axios
        .get(`https://imdb-api.com/en/API/${type}/k_4sewq6nu/${search}`)
        .then((response) => {
          setMovies(response.data.results);
          setSeach("");
          setLoading(false);
          console.log("should be false", loading);
        });
    }
  }, [type, search]);

  useEffect(() => {
    if (searching.current === "") {
      axios
        .get("https://imdb-api.com/API/AdvancedSearch/k_4sewq6nu", {
          params: {
            genres: searchGenre + "",
          },
        })
        .then((res) => {
          if (res.data.results !== []) {
            setSeach("");
            setMovies(res.data.results);
          } else {
            setLoading(true);
          }
        });
    }
  }, [searchGenre]);
  console.log(loading);
  return (
    <div className="container-fluid bg-dark d-flex flex-wrap justify-content-center align-items-center">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        ""
      )}
      {movies?.map((el, index) => {
        return (
          <div
            className="bg-primary text-light p-2 d-flex flex-column justify-content-end"
            key={index}
            style={{ width: 500, height: 650, margin: 10 }}
          >
            <LazyLoadImage
              src={el.image}
              style={{
                width: "100%",
                height: "60%",
                marginBottom: "auto",
              }}
            />

            <h2>{el.title}</h2>
            <h6>{el.description}</h6>

            <div className="justify-content-between d-flex">
              <p>{el.year}</p>
              <p>
                <span>
                  <i className="bi bi-star-fill text-warning mr-2"></i>
                </span>
                {el.imDbRating}
              </p>
            </div>
            <Link
              onClick={() => {
                setShareId(el.id);
              }}
              to={"/movie"}
              className="btn btn-warning text-light font-weight-bold"
            >
              Check this movie
            </Link>
          </div>
        );
      })}
    </div>
  );
}
