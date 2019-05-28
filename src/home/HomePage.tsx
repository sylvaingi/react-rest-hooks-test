import React, { useState, useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { useResource, useSubscription } from "rest-hooks";
import { BreedResource } from "core/resources/CatApi";

const breedListRequest = BreedResource.listRequest();

export interface Props extends RouteComponentProps {}

const HomePage: React.FC<Props> = () => {
  const [page, setPage] = useState(0);
  const handleNext = useCallback(
    () => {
      setPage(page + 1)
    },
    [page],
  );

  const breeds = useResource(breedListRequest, { page, limit: 5 });
  useSubscription(breedListRequest, { page, limit: 5 });

  return (
    <>
      <ul>
        {breeds.map(b => (
          <li key={b.id}>
            <Link to={`/${b.id}`}>{b.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </>
  );
};

export default HomePage;
