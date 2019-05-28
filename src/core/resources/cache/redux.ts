import {
  reducer,
  NetworkManager,
  SubscriptionManager,
  PollingSubscription
} from "rest-hooks";
import { createStore, applyMiddleware, compose } from "redux";
import { hydrateResourceCache, persistCacheMiddleware } from "./storage";
import { ImageResource, BreedResource } from "../CatApi";

const manager = new NetworkManager();
const subscriptionManager = new SubscriptionManager(PollingSubscription);

const composeEnhancers =
  (typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const createReduxCache = () =>
  createStore(
    reducer,
    hydrateResourceCache([ImageResource, BreedResource]),
    composeEnhancers(
      applyMiddleware(
        persistCacheMiddleware,
        manager.getMiddleware(),
        subscriptionManager.getMiddleware()
      )
    )
  );

export const selector = (state: any) => state;
