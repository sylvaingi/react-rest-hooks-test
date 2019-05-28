import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { BreedResource, ImageResource } from "core/resources/CatApi";
import { useResource } from "rest-hooks";

const breedRequest = BreedResource.singleRequest();

const imageRequest = ImageResource.singleRequest();

export type Props = RouteComponentProps<{
  id: string;
}>;

const DetailsPage: React.FC<Props> = ({
  match: {
    params: { id }
  }
}) => {
  const breed = useResource(breedRequest, { id });
  const image = useResource(imageRequest, { id });
  return (
    <div>
      {breed.name} <img src={image.href} alt={breed.name} />
    </div>
  );
};

export default DetailsPage;
