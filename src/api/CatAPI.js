const { REACT_APP_CAT_API_URL, REACT_APP_CAT_API_KEY } = process.env;

/**
 * Fetch a list of cat breeds
 * @returns An array containing the list of cat breeds
 */
const fetchBreeds = async () => {
  const data = await fetch(`${REACT_APP_CAT_API_URL}/breeds`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": REACT_APP_CAT_API_KEY,
    },
  });

  if (data.status >= 200 && data.status <= 299) {
    return await data.json();
  } else {
    return {
      error: true,
    };
  }
};

/**
 * Fecth a list of cats under the selected breed
 * @param {Number} page The page number to load
 * @param {String} breed_id The corresponding breed id
 * @returns An array containing a list of the cat's data under the selected breed_id
 */
const fetchCatsByBreed = async (breed, page, limit) => {
  const data = await fetch(
    `${REACT_APP_CAT_API_URL}/images/search?page=${page}&breed_ids=${breed}&limit=${limit}&order=asc`,

    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": REACT_APP_CAT_API_KEY,
      },
    }
  );

  if (data.status >= 200 && data.status <= 299) {
    return {
      paginationCount: await data.headers.get("pagination-count"),
      data: await data.json(),
    };
  } else {
    return {
      error: true,
    };
  }
};

/**
 * Get the data of the cat
 * @param {String} catID The cat id
 * @returns An object containing the details of the cat
 */
const fetchCat = async (catID) => {
  const data = await fetch(
    `${REACT_APP_CAT_API_URL}/images/${catID}`,

    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": REACT_APP_CAT_API_KEY,
      },
    }
  );

  if (data.status >= 200 && data.status <= 299) {
    return await data.json();
  } else {
    return {
      error: true,
    };
  }
};

export { fetchBreeds, fetchCatsByBreed, fetchCat };
