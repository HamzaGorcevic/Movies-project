import { useEffect, useState } from "react";
import Layout from "./LayoutFolder/layout-m";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateContext } from "./context";
import { DynamicStar } from "react-dynamic-star";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KEY from "./apikey";

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
      .request({
        method: "POST",
        url: `https://imdb188.p.rapidapi.com/api/v1/${type}`,

        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": `${KEY}`,
          "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
        },
        data: {
          country: {
            anyPrimaryCountries: ["IN"],
          },
          limit: 50,
        },
      })
      .then((response) => {
        console.log(response);
        setMovies(response.data.data.list);
        setLoading(false);
      });
  }, [type]);

  return (
    <div className="d-flex flex-wrap bg-dark justify-content-center pt-5">
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
            className=" bg-primary text-light p-2 d-flex flex-column justify-content-end"
            key={index}
            style={{ width: 400, height: 600, margin: 20 }}
          >
            <LazyLoadImage
              src={el.title.primaryImage.imageUrl}
              height={"60%"}
              width={"100%"}
              style={{
                marginBottom: "auto",
              }}
            />

            <h3>
              {el.title.originalTitleText.text?.length > 20
                ? `${el.title.originalTitleText.text?.slice(0, 20)}....`
                : el.title.originalTitleText.text}
            </h3>

            <div className="d-flex flex-column">
              {/* <p>{el.title.releaseDate.year}</p> */}
              <p>
                <DynamicStar
                  rating={el.title.ratingsSummary.aggregateRating}
                  width={20}
                  height={20}
                  totalStars={10}
                  emptyStarColor={"grey"}
                />
                Rated: {el.title.ratingsSummary.aggregateRating}
              </p>
            </div>
            <Link
              style={{ background: "#D98514" }}
              to={"/movie"}
              className="btn  text-light font-weight-bold"
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
