import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const HomePage = lazy(() =>
  import(/* webpackChunkName: "home" */ "./home/HomePage")
);
const DetailsPage = lazy(() =>
  import(/* webpackChunkName: "details" */ "./details/DetailsPage")
);

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/:id" exact component={DetailsPage} />
  </Switch>
);

export default Routes;