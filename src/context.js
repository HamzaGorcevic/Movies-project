import { createContext, useState } from "react";

const CreateContext = createContext();
export { CreateContext };
export default function ContextShare({ children }) {
  const [shareId, setShareId] = useState("");
  const [shareMovie, setShareMovie] = useState("");
  const [type, setType] = useState("SearchMovie");
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
        }}
      >
        {children}
      </CreateContext.Provider>
    </div>
  );
}
