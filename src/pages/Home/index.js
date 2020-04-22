import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import VideoThumb from "../../components/VideoThumb";

import styles from "./home.module.scss";
import FadeIn from "react-fade-in";

class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <FadeIn className="page-content">
        <div className={styles.listMargin}>
          <h5>{t("pages.home.videosai")}</h5>
          <hr />
          <div className="row">
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
          </div>
        </div>
        <div className={styles.listMargin}>
          <h5>{t("shared.recommended", { count: 2 })}</h5>
          <hr />
          <div className="row">
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
          </div>
        </div>
        <div className={styles.listMargin}>
          <h5>{t("pages.home.followed")}</h5>
          <hr />
          <div className="row">
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default withRouter(withTranslation()(Home));
