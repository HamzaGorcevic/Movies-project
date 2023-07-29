import { useEffect, useState } from "react";
import Layout from "./LayoutFolder/layout-m";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateContext } from "./context";
import { DynamicStar } from "react-dynamic-star";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KEY from "./apikey";
import "./style.css";

import PLay from "./svg/play.svg";

export default function LandingPage() {
  const [movies, setMovies] = useState([]);
  const { setShareId, type, setSeach, setSearchGenre } =
    useContext(CreateContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSeach("");
    setSearchGenre([]);
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/popular?api_key=${KEY}&language=en-US`
      )
      .then((response) => {
        console.log("res", response.data.results);
        setMovies(response.data.results);
        setLoading(false);
      });
  }, [type]);

  const firstMovie = movies[5];
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
      {movies.map((el, index) => {
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
