import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import FadeIn from "react-fade-in";
//import VideoThumb from "../../components/VideoThumb";

//import styles from "./live.module.scss";

class Live extends Component {
  render() {
    const { t } = this.props;
    return (
      <FadeIn className="page-content text-center">
        <br />
        <br />
        <br />
        <img src="/assets/erro.svg" alt="error" width="100"></img>
        <br />
        <br />
        <h3>{t("pages.live.error")}</h3>
      </FadeIn>
    );
  }
}

export default withRouter(withTranslation()(Live));
