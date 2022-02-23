import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const useIsLoading = () => useContext(LoadingContext);

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, useIsLoading };
