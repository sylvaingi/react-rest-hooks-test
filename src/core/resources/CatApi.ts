import {
  Resource,
  ReadShape,
  SchemaBase,
  AbstractInstanceType
} from "rest-hooks";
import { SuperAgentRequest } from "superagent";

const API_KEY = "b349fd9e-9d59-412b-88d4-5a029cb37ac5";
const URL_ROOT = "https://api.thecatapi.com/v1";

export abstract class CatApiRessource extends Resource {
  readonly id: string = "";

  static fetchPlugin = (request: SuperAgentRequest) =>
    request.set("x-api-key", API_KEY);

  static getRequestOptions() {
    return {
      ...super.getRequestOptions(),
      dataExpiryLength: 60 * 60 * 1000 // one hour
    };
  }

  pk() {
    return this.id;
  }
}

export class BreedResource extends CatApiRessource {
  readonly name: string = "";
  readonly temperament: string = "";
  readonly life_span: string = "";
  readonly origin: string = "";

  static urlRoot = `${URL_ROOT}/breeds/`;
}

export class ImageResource extends CatApiRessource {
  readonly href: string = "";

  static urlRoot = `${URL_ROOT}/images/`;

  static singleRequest<T extends typeof Resource>(
    this: T
  ): ReadShape<SchemaBase<AbstractInstanceType<T>>> {
    return {
      ...super.singleRequest(),
      getUrl: (params: { id: string }) =>
        `${this.urlRoot}search/?limit=1&breed_id=${params.id}`,
      fetch: async (url, body) => {
        const [{ id, url: href }] = await this.fetch("get", url, body);
        return { id, href };
      }
    };
  }
}
