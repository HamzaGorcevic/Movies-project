import LandingPage from "./landing-page";
import LayoutFile from "./LayoutFolder/layout-m";
import { Routes, Route } from "react-router-dom";
import Movie from "./singliemovie";
import ContextShare from "./context";

function App() {
  return (
    <ContextShare>
      <LayoutFile>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </LayoutFile>
    </ContextShare>
  );
}

export default App;
