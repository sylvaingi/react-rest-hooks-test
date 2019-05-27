import React, { Suspense, lazy } from "react";
import { RestProvider, NetworkErrorBoundary } from "rest-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const HomePage = lazy(() =>
  import(/* webpackChunkName: "home" */ "./home/HomePage")
);
const DetailsPage = lazy(() =>
  import(/* webpackChunkName: "details" */ "./details/DetailsPage")
);

const App: React.FC = () => {
  return (
    <RestProvider>
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <NetworkErrorBoundary>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/:id" exact component={DetailsPage} />
            </Switch>
          </NetworkErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </RestProvider>
  );
};

export default App;
