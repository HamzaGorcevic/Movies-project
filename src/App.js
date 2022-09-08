import LandingPage from "./landing-page";
import LayoutFile from "./LayoutFolder/layout-m";
import { Routes, Route } from "react-router-dom";
import Movie from "./singliemovie";
import ContextShare from "./context";
import SearchMovie from "./LayoutFolder/search-m";

function App() {
  return (
    <ContextShare>
      <LayoutFile>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/search" element={<SearchMovie />} />
        </Routes>
      </LayoutFile>
    </ContextShare>
  );
}

export default App;
