import { useContext } from "react";
import { CreateContext } from "./context";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { DynamicStar } from "react-dynamic-star";

export default function Movie() {
  const { shareId } = useContext(CreateContext);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`https://imdb-api.com/en/API/Title/k_1p4c9h6h${`/${shareId}`}`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="container-fluid bg-dark p-5">
      <div className="d-lg-flex justify-content-around w-100">
        <div
          style={{
            width: "auto",
            height: "87vh",
            position: "relative",
          }}
        >
          <img
            src={movie.image}
            alt=""
            style={{
              backgroundAttachment: "fixed",
              borderRadius: 20,
              objectFit: "cover",

              height: "100%",
            }}
          />
          <div
            style={{
              background:
                "linear-gradient(to top right,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0))",
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              borderRadius: 20,
            }}
          ></div>
          <div
            className="d-flex align-items-start justify-content-between flex-column"
            style={{
              color: "white",
              width: 100,
              position: "absolute",
              bottom: "2%",
              left: "2%",
            }}
          >
            <h1 style={{ width: "120%" }}>{movie.title}</h1>
            <div
              className="d-flex flex-column"
              style={{
                width: 250,
              }}
            >
              <h2>
                <DynamicStar
                  rating={movie.imDbRating}
                  totalStars={10}
                  width={30}
                  height={30}
                  emptyStarColor={"grey"}
                />
              </h2>

              <h4 style={{ whiteSpace: "nowrap" }}>
                {movie.imDbRatingVotes} votes
              </h4>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ">
          <h2 className="text-white">{movie.fullTitle}</h2>
          <h3 style={{ color: "#D98514" }}>
            {" "}
            <span className="text-white">Writers:</span> {movie.writers}
          </h3>
          <p
            style={{
              width: "70ch",
              color: "white",
            }}
          >
            {movie.plot}
          </p>
          <h5 style={{ marginTop: "auto" }}>
            Realese date:{movie.releaseDate}
          </h5>
        </div>
      </div>
    </div>
  );
}
