import { useContext } from "react";
import { CreateContext } from "./context";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { DynamicStar } from "react-dynamic-star";

export default function Movie() {
  const { shareId } = useContext(CreateContext);
  const [movie, setMovie] = useState({});

  console.log("shared", shareId);

  // useEffect(() => {
  //   axios
  //     .get(`https://imdb-api.com/en/API/Title/k_1p4c9h6h${`/${shareId}`}`)
  //     .then((response) => {
  //       setMovie(response.data);
  //       console.log(response.data);
  //     });
  // }, []);

  console.log("image", shareId);
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
            src={shareId.title.primaryImage.imageUrl}
            alt=""
            style={{
              backgroundAttachment: "fixed",
              borderRadius: 20,
              objectFit: "contain",
              height: "100%",
              width: "100%",
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
            <h1 style={{ width: "120%" }}>
              {shareId.title.originalTitleText.text}
            </h1>
            <div
              className="d-flex flex-column"
              style={{
                width: 250,
              }}
            >
              <h2>
                <DynamicStar
                  rating={shareId.title.ratingsSummary.aggregateRating / 2}
                  totalStars={5}
                  width={30}
                  height={30}
                  emptyStarColor={"grey"}
                />
              </h2>

              <h4 style={{ whiteSpace: "nowrap" }}>
                {shareId.title.ratingsSummary.aggregateRating} votes
              </h4>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column m-5">
          <h2 className="text-white">{shareId.title.titleText.title}</h2>
          <h3 style={{ color: "#D98514" }}>
            {" "}
            <span className="text-white">Writers:</span> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Odio, non?
          </h3>
          <p
            style={{
              width: "60vw",
              color: "white",
            }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
            quod quidem molestiae magnam provident obcaecati, dolore aut earum
            ipsa ut iure, vero illo omnis eius sunt atque blanditiis eum
            dignissimos, enim labore. Qui dolorum in accusantium voluptate
            quisquam, voluptatibus reprehenderit.
          </p>
          <h5 style={{ marginTop: "auto" }}>{2023}</h5>
        </div>
      </div>
    </div>
  );
}
