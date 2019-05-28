import React, { Suspense } from "react";
import { NetworkErrorBoundary } from "rest-hooks";
import { BrowserRouter } from "react-router-dom";
import Routes from "Routes";
import { ImageResource, BreedResource } from "core/resources/CatApi";
import CachingRestProvider from "core/lib/CachingRestProvider";
import LocalStorageCache from "core/lib/LocalStorageCache";

const cache = new LocalStorageCache({
  resources: [ImageResource, BreedResource]
});

const App: React.FC = () => {
  return (
    <CachingRestProvider cache={cache}>
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <NetworkErrorBoundary>
            <Routes />
          </NetworkErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </CachingRestProvider>
  );
};

export default App;
