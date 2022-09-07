import LandingPage from "./landing-page";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateContext } from "./context";
import { useEffect } from "react";

export default function Movie() {
  const { shareId } = useContext(CreateContext);
  console.log(shareId);
  useEffect(() => {}, []);
  return <div></div>;
}
