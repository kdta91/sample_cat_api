import { useState, useEffect } from "react";
import { fetchBreeds } from "../api/CatAPI";
import { useBreed } from "../contexts/CatBreedsContext";
import { useError } from "../contexts/ErrorContext";
import { useIsLoading } from "../contexts/LoadingContext";
import Form from "react-bootstrap/Form";
import AlertNotification from "./AlertNotification";

const BreedSelector = () => {
  const [breeds, setBreeds] = useState([]);

  const { breed, setBreed } = useBreed();
  const { error, setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();

  const selectBreed = (e) =>
    e.target.value ? setBreed(e.target.value) : setBreed("");

  useEffect(() => {
    /**
     * Set the breeds array from the returned list of breeds
     */
    const getBreeds = async () => {
      setIsLoading(true);
      const data = await fetchBreeds();
      data.error ? setError(data.error) : setBreeds(data) && setError(false);
      setIsLoading(false);
    };
    getBreeds();
  }, [setError, setIsLoading]);

  return (
    <>
      {error && (
        <AlertNotification
          variant="danger"
          text="Apologies but we could not load new cats for you at this time! Miau!"
        />
      )}

      <h1>Cat Browser</h1>

      <Form.Group className="my-4">
        <Form.Label>Breed</Form.Label>
        <Form.Select value={breed} onChange={selectBreed} disabled={isLoading}>
          <option value="">Select breed</option>
          {breeds &&
            breeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      {isLoading && "Loading..."}
    </>
  );
};

export default BreedSelector;
