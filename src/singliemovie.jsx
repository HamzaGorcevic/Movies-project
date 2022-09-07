import LandingPage from "./landing-page";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateContext } from "./context";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Movie() {
  const { shareId } = useContext(CreateContext);
  const [movie, setMovie] = useState({});
  console.log(shareId);
  useEffect(() => {
    axios
      .get(`https://imdb-api.com/en/API/Title/k_qolyo557${`/${shareId}`}`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="container-fluid bg-dark p-5">
      <div className="d-flex justify-content-between w-100">
        <div
          style={{
            width: "80vh",
            height: "80vh",
          }}
        >
          <img
            src={movie.image}
            alt=""
            style={{
              borderRadius: 20,
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <h5
          style={{
            width: "70ch",
          }}
        >
          {movie.plot}
        </h5>
      </div>

      <h1>{movie.title}</h1>

      <div
        className="d-flex align-items-end justify-content-between"
        style={{ width: 100 }}
      >
        <h2>
          <i
            className={`bi bi-star${
              Number(movie.imDbRating) < 7 ? "-hlaf" : "-fill"
            } text-warning`}
          ></i>
        </h2>
        <h2>{movie.imDbRating}</h2>
      </div>
      <h4>{movie.imDbRatingCount}</h4>
    </div>
  );
}
