import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { useResource } from "rest-hooks";
import { BreedResource } from "core/resources/CatApi";

export interface Props extends RouteComponentProps {}

const HomePage: React.FC<Props> = () => {
  const breeds: BreedResource[] = useResource(BreedResource.listRequest(), {});
  return (
    <ul>
      {breeds.map(b => (
        <li key={b.id}>
          <Link to={`/${b.id}`}>{b.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;