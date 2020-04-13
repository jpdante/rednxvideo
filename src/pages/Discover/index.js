import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import VideoThumb from "../../components/VideoThumb";
import AuthModals from "../../components/AuthModals";

import styles from "./discover.module.scss";

class Discover extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="fix-heigth">
        <NavBar />
        <div className="sidebar-wrapper">
          <SideBar />
          <div className={`${styles.discoverContent}`}>
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

export default withRouter(withTranslation()(Discover));
