import { useContext } from "react";
import { CreateContext } from "./context";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function SearchMovie() {
  const { shareMovie, setShareId } = useContext(CreateContext);
  console.log(shareMovie, "Hello");

  return (
    <div className="container-fluid bg-dark d-flex flex-wrap justify-content-center align-items-center">
      {shareMovie?.map((el, index) => {
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
