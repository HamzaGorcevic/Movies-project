import { useEffect, useState } from "react";
import Layout from "./LayoutFolder/layout-m";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateContext } from "./context";
import { DynamicStar } from "react-dynamic-star";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function LandingPage() {
  const [movies, setMovies] = useState([]);
  const { setShareId, type, setLoader, setSeach, setSearchGenre } =
    useContext(CreateContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSeach("");
    setSearchGenre([]);
    axios
      .get(
        `https://imdb-api.com/en/API/${
          type !== "SearchMovie" ? "Top250TVs" : "Top250Movies"
        }/k_eczf0vgn`
      )
      .then((response) => {
        setMovies(response.data.items);
        setLoading(false);
      });
  }, [type]);

  return (
    <div className="d-flex flex-wrap bg-dark justif-content-center pt-5">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        ""
      )}
      {movies.map((el, index) => {
        return (
          <div
            className="bg-primary text-light p-2 d-flex flex-column justify-content-end"
            key={index}
            style={{ width: 400, height: 700, margin: 20 }}
          >
            <LazyLoadImage
              src={el.image}
              height={"60%"}
              width={"100%"}
              style={{
                marginBottom: "auto",
              }}
            />

            <h3>
              {el.title?.length > 20
                ? `${el.title?.slice(0, 20)}....`
                : el.title}
            </h3>
            <div className="d-flex flex-column">
              <p>{el.year}</p>
              <p>
                <DynamicStar
                  rating={el.imDbRating}
                  width={20}
                  height={20}
                  totalStars={10}
                  emptyStarColor={"grey"}
                />
                Rated: {el.imDbRatingCount}
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
