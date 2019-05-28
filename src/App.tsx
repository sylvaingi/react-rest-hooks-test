import React, { Suspense } from "react";
import { NetworkErrorBoundary, ExternalCacheProvider } from "rest-hooks";
import { BrowserRouter } from "react-router-dom";
import { createReduxCache, selector } from "core/resources/cache/redux";
import Routes from "Routes";

const reduxCache = createReduxCache();

const App: React.FC = () => {
  return (
    <ExternalCacheProvider store={reduxCache} selector={selector}>
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <NetworkErrorBoundary>
            <Routes />
          </NetworkErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </ExternalCacheProvider>
  );
};

export default App;
