import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch/*, Redirect*/ } from "react-router-dom";

import api from "./library/api";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Watch from "./pages/Watch";
import Category from "./pages/Category";
import Channel from "./pages/Channel";
import NewChannel from "./pages/NewChannel";
import SelectChannel from "./pages/NewChannel";
import Hot from "./pages/Hot";
import Live from "./pages/Live";
import Recommended from "./pages/Recommended";
import History from "./pages/History";
import Following from "./pages/Following";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoadingFullScreen from "./pages/LoadingFullScreen";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

/*const PrivateRoute = ({ component: Component, ...rest }) => (
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
);*/

const Routes = () => {
  api.checkSession();
  return (
  <BrowserRouter>
    <Suspense fallback={<LoadingFullScreen />}>
      <div className="content">
        <NavBar />
        <div className="wrapper">
          <SideBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/watch/:id" component={Watch} />
            <Route path="/category/:category" component={Category} />
            <Route path="/channel/:channel" component={Channel} />
            <Route path="/discover" component={Discover} />
            <Route path="/hot" component={Hot} />
            <Route path="/live" component={Live} />
            <Route path="/recommended" component={Recommended} />
            <Route path="/history" component={History} />
            <Route path="/following" component={Following} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/new-channel" component={NewChannel} />
            <Route path="/select-channel" component={SelectChannel} />
            <Route path="/dev/loadingfs" component={LoadingFullScreen} />
            <Route path="/dev/loading" component={Loading} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Suspense>
  </BrowserRouter>
)};

export default Routes;
