import { createContext, useContext, useState } from "react";

const BreedContext = createContext();

const useBreed = () => useContext(BreedContext);

const CatBreedsProvider = ({ children }) => {
  const [breed, setBreed] = useState("");
  const [prevBreed, setPrevBreed] = useState("");

  return (
    <BreedContext.Provider value={{ breed, setBreed, prevBreed, setPrevBreed }}>
      {children}
    </BreedContext.Provider>
  );
};

export { CatBreedsProvider, useBreed };
