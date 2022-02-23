import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

const useError = () => useContext(ErrorContext);

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState("");

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, useError };
