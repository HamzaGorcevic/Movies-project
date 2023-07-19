import { useContext, useEffect, useRef, useState } from "react";
import { CreateContext } from "./context";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KEY from "./apikey";
import { DynamicStar } from "react-dynamic-star";
export default function SearchMovie() {
  const { setShareId, search, type, searchGenre, setSeach, setSearchGenre } =
    useContext(CreateContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serachedMovies, setSearchedMovies] = useState([]);

  console.log("search", search);
  useEffect(() => {
    if (searchGenre.length == 0 || search.length > 0) {
      console.log("rendered");
      axios
        .get(`https://imdb188.p.rapidapi.com/api/v1/searchIMDB`, {
          headers: {
            "X-RapidAPI-Key": `${KEY}`,
            "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
          },
          params: {
            query: search,
          },
        })
        .then((response) => {
          setSearchGenre([]);
          console.log(response);
          setSearchedMovies(response.data.data);
          setLoading(false);
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
          } else {
            setLoading(true);
          }
        });
    }
  }, [searchGenre]);
  console.log("movies", searchGenre.length, movies);

  return (
    <div className="d-flex flex-wrap bg-dark justify-content-center pt-5">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        ""
      )}
      {(searchGenre.length ? movies : serachedMovies).map((el, index) => {
        return (
          <div
            className=" bg-primary text-light p-2 d-flex flex-column justify-content-end"
            key={index}
            style={{ width: 400, height: 600, margin: 20 }}
          >
            <LazyLoadImage
              src={
                searchGenre.length ? el.title.primaryImage.imageUrl : el.image
              }
              height={"60%"}
              width={"100%"}
              style={{
                marginBottom: "auto",
              }}
            />

            <h3>
              {searchGenre.length
                ? `${
                    el.title.originalTitleText.text?.length > 20
                      ? `${el.title.originalTitleText.text?.slice(0, 20)}....`
                      : el.title.originalTitleText.text
                  }`
                : `${el.title}`}
            </h3>

            <div className="d-flex flex-column">
              <p>
                {searchGenre.length
                  ? `${el?.title?.releaseDate?.year}`
                  : el?.year && `${el?.year}`}
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
