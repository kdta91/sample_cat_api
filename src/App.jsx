import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CatBreedsProvider } from "./contexts/CatBreedsContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import Container from "react-bootstrap/Container";
import BreedSelector from "./components/BreedSelector";
import Cats from "./components/Cats";
import Cat from "./components/Cat";

const App = () => {
  return (
    <Router>
      <Container className="my-4">
        <LoadingProvider>
          <ErrorProvider>
            <CatBreedsProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <BreedSelector />
                      <Cats />
                    </>
                  }
                />
                <Route path="/:catID" element={<Cat />} />
              </Routes>
            </CatBreedsProvider>
          </ErrorProvider>
        </LoadingProvider>
      </Container>
    </Router>
  );
};

export default App;
