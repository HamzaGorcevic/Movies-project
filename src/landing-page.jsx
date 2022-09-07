import { useEffect, useState } from "react";
import Layout from "./LayoutFolder/layout-m";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateContext } from "./context";
export default function LandingPage() {
  const [movies, setMovies] = useState([]);

  const { shareId, setShareId } = useContext(CreateContext);
  console.log(shareId);
  const key = "k_v6804dc1";

  useEffect(() => {
    axios
      .get("https://imdb-api.com/en/API/MostPopularTvs/k_j1hexm69", {
        params: {},
      })
      .then((response) => {
        setMovies(response.data.items);
      });
  }, []);
  console.log(movies);
  return (
    <div className="d-flex flex-wrap bg-dark justify-content-center pt-5">
      {movies.map((el, index) => {
        return (
          <div
            className="bg-primary text-light p-2 d-flex flex-column justify-content-end"
            key={index}
            style={{ width: 350, height: "auto", margin: 10 }}
          >
            <img
              src={el.image}
              style={{
                width: "100%",
                height: "300px",
                marginBottom: "auto",
              }}
            />

            <h5>{el.title}</h5>
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
              to={"/movie"}
              className="btn btn-warning text-light font-weight-bold"
              onClick={() => {
                setShareId(el.id);
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
