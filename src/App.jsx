import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CatBreedsProvider } from "./contexts/CatBreedsContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import Container from "react-bootstrap/Container";
import BreedSelector from "./components/BreedSelector";
import Cat from "./components/Cat";

const App = () => {
  return (
    <Router>
      <Container className="my-4">
        <ErrorProvider>
          <CatBreedsProvider>
            <Routes>
              <Route path="/" element={<BreedSelector />} />
              <Route path="/:catID" element={<Cat />} />
            </Routes>
          </CatBreedsProvider>
        </ErrorProvider>
      </Container>
    </Router>
  );
};

export default App;
