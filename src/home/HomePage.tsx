import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { useResource } from "rest-hooks";
import { BreedResource } from "core/resources/CatApi";

const breedListRequest = BreedResource.listRequest();

export interface Props extends RouteComponentProps {}

const HomePage: React.FC<Props> = ({ location }) => {
  const query = useMemo(() => new URLSearchParams(location.search.slice(1)), [
    location.search
  ]);

  const page = query.has("page") ? parseInt(query.get("page")!, 10) : 0;

  const breeds = useResource(breedListRequest, { page, limit: 5 });

  return (
    <>
      <ul>
        {breeds.map(b => (
          <li key={b.id}>
            <Link to={`/${b.id}`}>{b.name}</Link>
          </li>
        ))}
      </ul>
      <Link to={`${location.pathname}?page=${page - 1}`}>Prev</Link>
      <Link to={`${location.pathname}?page=${page + 1}`}>Next</Link>
    </>
  );
};

export default HomePage;
