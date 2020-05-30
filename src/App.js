import React from "react";
import Routes from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./services/i18n";
import {
  faSearch,
  faBars,
  faPlay,
  faFire,
  faHistory,
  faSatelliteDish,
  faHeart,
  faThumbsUp,
  faThumbsDown,
  faGraduationCap,
  faGamepad,
  faTheaterMasks,
  faVial,
  faCamera,
  faFutbol,
  faShare,
  faEye,
  faEyeSlash,
  faFlag,
  faUndo,
  faRedo,
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
  faThumbsDown,
  faGraduationCap,
  faGamepad,
  faTheaterMasks,
  faVial,
  faCamera,
  faFutbol,
  faShare,
  faEye,
  faEyeSlash,
  faFlag,
  faUndo,
  faRedo
);

const App = () => <Routes />;
export default App;
