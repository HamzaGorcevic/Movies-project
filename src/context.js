import { createContext, useState } from "react";

const CreateContext = createContext();
export { CreateContext };
export default function ContextShare({ children }) {
  const [shareId, setShareId] = useState("");
  return (
    <div>
      <CreateContext.Provider value={{ shareId, setShareId }}>
        {children}
      </CreateContext.Provider>
    </div>
  );
}
