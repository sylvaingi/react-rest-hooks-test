import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { BreedResource, ImageResource } from "core/resources/CatApi";
import { useResource } from "rest-hooks";

export type Props = RouteComponentProps<{
  id: string;
}>;

const DetailsPage: React.FC<Props> = ({
  match: {
    params: { id }
  }
}) => {
  const breed: BreedResource = useResource(BreedResource.singleRequest(), {
    id
  });
  const image: ImageResource = useResource(
    ImageResource.singleRequest(),
    { id }
  );
  return (
    <div>
      {breed.name} <img src={image.href} alt={breed.name} />
    </div>
  );
};

export default DetailsPage;
