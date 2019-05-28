import mapValues from "lodash/mapValues";
import { Resource, State } from "rest-hooks";
import { Cache } from "./CachingRestProvider";

class LocalStorageCache<T> implements Cache<T> {
  resources: (typeof Resource)[];
  key: string;

  constructor({
    resources,
    key = "entities-cache"
  }: {
    resources: (typeof Resource)[];
    key?: string;
  }) {
    this.resources = resources;
    this.key = key;
  }

  save(state: State<T>) {
    try {
      localStorage.setItem(this.key, JSON.stringify(state));
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to persist redux state", error);
      }
    }
  }

  load(): State<T> | undefined {
    const resourceMap = this.resources.reduce(
      (acc, r) => ({ ...acc, [r.getKey()]: r }),
      {} as { [key: string]: typeof Resource }
    );

    try {
      const storedCache = localStorage.getItem(this.key);
      if (storedCache !== null) {
        const rawCache = JSON.parse(storedCache);

        const entities = mapValues(rawCache.entities, (r, k) => {
          const resource = resourceMap[k];

          if (resource == null) {
            throw new Error(`Unknown resource key found in storage: ${k}`);
          }

          return mapValues(r, e => resource.fromJS(e));
        });

        return { ...rawCache, entities };
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn(error);
      }
    }

    return undefined;
  }
}

export default LocalStorageCache;
