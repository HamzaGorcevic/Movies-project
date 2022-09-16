import { createContext, useState } from "react";

const CreateContext = createContext();
export { CreateContext };
export default function ContextShare({ children }) {
  const [shareId, setShareId] = useState("");
  const [shareMovie, setShareMovie] = useState("");
  const [type, setType] = useState("SearchMovie");
  const [genre, setGenre] = useState([]);
  const [searchGenre, setSearchGenre] = useState([]);
  const [search, setSeach] = useState("");
  const [value, setValue] = useState("");
  const [loader, setLoader] = useState(false);

  return (
    <div>
      <CreateContext.Provider
        value={{
          shareId,
          setShareId,
          shareMovie,
          setShareMovie,
          type,
          setType,
          genre,
          setGenre,
          searchGenre,
          setSearchGenre,
          search,
          setSeach,
          value,
          setValue,
          loader,
          setLoader,
        }}
      >
        {children}
      </CreateContext.Provider>
    </div>
  );
}
