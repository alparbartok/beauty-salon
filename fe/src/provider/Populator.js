import { createContext, useState } from "react";

export const PopulatorContext = createContext(null);

export const PopulatorProvider = ({ children }) => {
  const [state, setState] = useState({ user_types: [] });

  return (
    <PopulatorContext.Provider value={{ state, setState }}>
      {children}
    </PopulatorContext.Provider>
  );
};
