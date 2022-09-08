import { useContext } from "react";
import { CreateContext } from "../context";

export default function SearchMovie() {
  const { shareMovie, setShareMovie } = useContext(CreateContext);
  console.log(shareMovie, "in search page");
  console.log("any");
  return (
    <div>
      {shareMovie.map((e) => {
        return (
          <div>
            <img src={e.image} alt="" />
            <h1>{e.title}</h1>
          </div>
        );
      })}
    </div>
  );
}
