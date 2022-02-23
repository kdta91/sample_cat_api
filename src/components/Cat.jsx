import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { fetchCat } from "../api/CatAPI";
import { useBreed } from "../contexts/CatBreedsContext";
import { useError } from "../contexts/ErrorContext";
import { useIsLoading } from "../contexts/LoadingContext";
import AlertNotification from "./AlertNotification";
import Btn from "./Btn";

const Cat = () => {
  const { error, setError } = useError();
  const { isLoading, setIsLoading } = useIsLoading();

  const [catName, setCatName] = useState("");
  const [catOrigin, setCatOrigin] = useState("");
  const [catImage, setCatImage] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [catTemperament, setCatTemperament] = useState("");
  const { setBreed } = useBreed();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Call the fetchCat() function and set the cat's respective attributes
     */
    const setCatAttributes = async () => {
      setIsLoading(true);

      const data = await fetchCat(params.catID);

      if (data.error) {
        setError(data.error);
      } else {
        const { id, name, description, origin, temperament } = data.breeds[0];

        setCatImage(data.url);
        setCatName(name);
        setCatOrigin(origin);
        setCatDescription(description);
        setCatTemperament(temperament);
        setBreed(id);

        setError(false);
      }

      setIsLoading(false);
    };

    setCatAttributes();
  }, [params.catID, setBreed, setError, setIsLoading]);

  return (
    <>
      {error && (
        <AlertNotification
          variant="danger"
          text="Apologies but we could not load the cat details for you at this time! Miau!"
        />
      )}

      {isLoading ? (
        "Loading cat details ..."
      ) : (
        <Card id="cat-details">
          <Card.Header>
            <Btn
              text="Back"
              variant="primary"
              onClick={() => navigate("/")}
            ></Btn>
          </Card.Header>
          <Card.Img variant="top" src={catImage} />
          <Card.Body>
            <h4>{catName}</h4>
            <Card.Title>Origin: {catOrigin}</Card.Title>
            <Card.Subtitle>{catTemperament}</Card.Subtitle>
            <Card.Text>{catDescription}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Cat;
