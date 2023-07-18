import { useContext, useEffect, useRef, useState } from "react";
import { CreateContext } from "./context";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KEY from "./apikey";
import { DynamicStar } from "react-dynamic-star";
export default function SearchMovie() {
  let searching = useRef();
  let genres = useRef();

  const { setShareId, search, type, searchGenre, setSeach } =
    useContext(CreateContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   genres.current = [];

  //   if (true) {
  //     axios
  //       .get(`https://imdb188.p.rapidapi.com/api/v1/searchIMDB`, {
  //         headers: {
  //           "X-RapidAPI-Key": `${KEY}`,
  //           "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
  //         },
  //         params: {
  //           query: search,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         setMovies(response.data);
  //         setSeach("");
  //         setLoading(false);
  //         console.log(loading, "first");
  //       });
  //   }
  // }, [type, search]);

  useEffect(() => {
    if (searching.current === "") {
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
          console.log("res data", res.data);
          if (res.data.data.list !== []) {
            setSeach("");
            setMovies(res.data.data.list);
          } else {
            setLoading(true);
          }
        });
    }
  }, [searchGenre]);

  console.log("movies:", movies);

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
