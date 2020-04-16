import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import VideoThumb from "../../components/VideoThumb";
import AuthModals from "../../components/AuthModals";

import styles from "./hot.module.scss";

class Hot extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="content">
        <NavBar />
        <div className="wrapper">
          <SideBar />
          <div className="page-content">
            <div className={styles.listMargin}>
              <h5>{t('pages.home.videosai')}</h5>
              <hr />
              <div className="row">
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
              </div>
            </div>
            <div className={styles.listMargin}>
              <h5>{t('shared.recommended', {count: 2})}</h5>
              <hr />
              <div className="row">
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
              </div>
            </div>
            <div className={styles.listMargin}>
              <h5>{t('pages.home.followed')}</h5>
              <hr />
              <div className="row">
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
              </div>
            </div>
          </div>
        </div>
        <AuthModals />
      </div>
    );
  }
}

export default withRouter(withTranslation()(Hot));
