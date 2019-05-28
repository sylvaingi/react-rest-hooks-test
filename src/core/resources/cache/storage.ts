import { Middleware } from "redux";
import mapValues from "lodash/mapValues";
import { Resource } from "rest-hooks";

const CACHE_STORAGE_KEY = "entities-cache";

export const persistCacheMiddleware: Middleware = store => next => action => {
  const returnValue = next(action);

  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(store.getState()));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to persist redux state", error);
    }
  }

  return returnValue;
};

export const hydrateResourceCache = (resources: (typeof Resource)[]) => {
  const resourceMap = resources.reduce(
    (acc, r) => ({ ...acc, [r.getKey()]: r }),
    {} as { [key: string]: typeof Resource }
  );

  try {
    const storedCache = localStorage.getItem(CACHE_STORAGE_KEY);
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

    return null;
  }
};
