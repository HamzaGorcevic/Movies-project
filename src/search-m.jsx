import { useContext, useEffect, useRef, useState } from "react";
import { CreateContext } from "./context";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KEY from "./apikey";
import { DynamicStar } from "react-dynamic-star";
import "./style.css";
import PLay from "./svg/play.svg";
export default function SearchMovie() {
  const { setShareId, search, type, searchGenre, setSeach, setSearchGenre } =
    useContext(CreateContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serachedMovies, setSearchedMovies] = useState([]);
  const [firstMovie, setFirstMovie] = useState("");
  console.log("search", search);
  useEffect(() => {
    if (searchGenre.length == 0 || search.length > 0) {
      console.log("rendered");
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${KEY}`
        )
        .then((response) => {
          setSearchGenre([]);
          console.log("Response", response);
          setSearchedMovies(response.data.results);
          setLoading(false);
          setFirstMovie(response.data.results[0]);
          console.log(firstMovie);
        });
    }
  }, [type, search]);

  console.log("searched", serachedMovies);

  useEffect(() => {
    if (search.length <= 2 || searchGenre.length > 0) {
      console.log("REREREndered", search.length);
      axios
        .request({
          method: "POST",
          url: `https://imdb188.p.rapidapi.com/api/v1/getPopularMovies`,
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": `${KEY}`,
            "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
          },
          data: {
            limit: 50,
            genre: {
              allGenreIds: searchGenre,
            },
          },
        })
        .then((res) => {
          console.log("res dataa", res.data);
          if (res.data.data.list !== []) {
            setSeach("");
            setMovies(res.data.data.list);
            setFirstMovie(res.data.results[0]);
            console.log(firstMovie);
          } else {
            setLoading(true);
          }
        });
    }
  }, [searchGenre]);
  console.log("movies", searchGenre.length, movies);
  console.log(firstMovie);
  return (
    <div className="d-flex flex-wrap bg-dark justify-content-center pt-5">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        ""
      )}
      <div className=" firstMovie bg-warning">
        <img
          src={`https://image.tmdb.org/t/p/original${firstMovie?.backdrop_path}`}
          alt=""
        />
        <section>
          <h1>
            {firstMovie?.title
              ? `${
                  firstMovie?.title.length > 40
                    ? `${firstMovie?.title?.slice(0, 40)}....`
                    : firstMovie?.title
                }`
              : `${firstMovie?.name}`}
          </h1>
          <h2>{firstMovie?.release_date}</h2>
          <p>{firstMovie?.overview}</p>
          <DynamicStar
            rating={firstMovie?.vote_average - 4}
            width={45}
            height={45}
            totalStars={5}
            emptyStarColor={"grey"}
          />
        </section>
      </div>
      {serachedMovies.map((el, index) => {
        return (
          <div
            className=" card text-light p-2 d-flex flex-column justify-content-end rounded"
            key={index}
            style={{ width: 400, height: 600, margin: 20 }}
          >
            <img className="svg" src={PLay} alt="" />
            <LazyLoadImage
              className="ImageCard"
              src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
            />

            <h3>
              {el.title
                ? `${
                    el.title.length > 20
                      ? `${el.title?.slice(0, 20)}....`
                      : el.title
                  }`
                : `${el.name}`}
            </h3>

            <div className="d-flex flex-column">
              <p>
                <DynamicStar
                  rating={el.vote_average}
                  width={22}
                  height={22}
                  totalStars={10}
                  emptyStarColor={"grey"}
                />
              </p>
              <span>Rated: {el.vote_average}</span>
              <span> Ratings:{el.vote_count}</span>
            </div>
            <Link
              style={{ background: "#D98514" }}
              to={"/movie"}
              className="btn  text-light font-weight-bold"
              onClick={() => {
                setShareId(el);
              }}
            >
              Check this movie
            </Link>
          </div>
        );
      })}
    </div>
  );
}
