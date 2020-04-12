import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Category from "./pages/Category";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Suspense fallback="loading">
      <Switch>
        <Route path="/watch/:id" component={Watch} />
        <Route path="/category/:category" component={Category} />
        <Route path="/" component={Home} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Routes;
