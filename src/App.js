import React from "react";
import Routes from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faBars,
  faPlay,
  faFire,
  faHistory,
  faSatelliteDish,
  faHeart,
  faThumbsUp,
  faGraduationCap,
  faGamepad,
  faTheaterMasks,
  faVial,
  faCamera,
  faFutbol
} from "@fortawesome/free-solid-svg-icons";
import "./styles/default.scss";

library.add(
  faSearch,
  faBars,
  faPlay,
  faFire,
  faHistory,
  faSatelliteDish,
  faHeart,
  faThumbsUp,
  faGraduationCap,
  faGamepad,
  faTheaterMasks,
  faVial,
  faCamera,
  faFutbol
);

const App = () => <Routes />;
export default App;
