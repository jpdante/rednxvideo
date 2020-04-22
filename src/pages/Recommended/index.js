import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import VideoThumb from "../../components/VideoThumb";

import styles from "./recommended.module.scss";
import FadeIn from "react-fade-in";

class Recommended extends Component {
  render() {
    const { t } = this.props;
    return (
      <FadeIn className="page-content">
        <div className={styles.listMargin}>
          <h5>{t("pages.recommended.title")}</h5>
          <hr />
          <div className="row">
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
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

export default withRouter(withTranslation()(Recommended));
