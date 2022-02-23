/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { fetchCatsByBreed } from "../api/CatAPI";
import { useBreed } from "../contexts/CatBreedsContext";
import { useError } from "../contexts/ErrorContext";
import Btn from "./Btn";

const Cats = () => {
  const navigate = useNavigate();

  const { breed, setPrevBreed, prevBreed } = useBreed();
  const { setError } = useError();

  const [paginationCount, setPaginationCount] = useState(0);
  const [paginationPage, setPaginationPage] = useState(0);
  const [paginationLimit, setPaginationLimit] = useState(10);
  const [cats, setCats] = useState([]);

  const loadMore = async () =>
    paginationCount > cats.length && setPaginationPage(paginationPage + 1);

  /**
   * Track previously selected breed to compare to the current breed
   * to determine whether or not to set a new cats array or append the next page
   */
  const prevBreedRef = useRef();

  useEffect(() => {
    prevBreedRef.current = breed;

    setPrevBreed(prevBreedRef.current);

    /**
     * Call fetchCatsByBreed() function that returns the pagination count
     * and an array containing the list of cats
     */
    const getCats = async () =>
      await fetchCatsByBreed(breed, paginationPage, paginationLimit);

    /**
     * Set the cats and paginationCount states to the returned value of getCats() function
     * if there is a selected breed and that the current breed is equal to the previously selected breed
     * else reset the cats, paginationCount and setPaginationPage states to their initial state
     */
    const setStates = async () => {
      const data = await getCats();

      if (data.error) {
        setError(data.error);
      } else {
        if (breed && breed === prevBreed) {
          setCats((cats) => [...cats, ...data.data]);
          setPaginationCount(data.paginationCount);
        } else {
          setCats([]);
          setPaginationCount(0);
          setPaginationPage(0);
        }

        setError(false);
      }
    };

    setStates();
  }, [
    breed,
    paginationPage,
    paginationLimit,
    setPrevBreed,
    prevBreed,
    setError,
  ]);

  return (
    <>
      <Row id="cats" className="my-2">
        {cats.length > 0 ? (
          cats.map((cat, i) => (
            <Col key={i} className="cat">
              <Card>
                <Card.Img variant="top" src={cat.url} />
                <Card.Body className="text-center">
                  <Btn
                    text="View Details"
                    variant="primary"
                    onClick={() => navigate(`/${cat.id}`)}
                  ></Btn>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12}>No cats available</Col>
        )}
      </Row>

      <Row>
        <Col className="my-4 text-center">
          <Btn
            text="Load more"
            variant="success"
            onClick={loadMore}
            disabled={paginationCount > cats.length ? false : true}
            style={{
              display: paginationCount > cats.length ? "inline-block" : "none",
            }}
          ></Btn>
        </Col>
      </Row>
    </>
  );
};

export default Cats;
