import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import VideoThumb from "../../components/VideoThumb";
import AuthModals from "../../components/AuthModals";

import styles from "./home.module.scss";

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="sidebar-wrapper">
          <SideBar />
          <div className={`${styles.homeContent}`}>
            <div className={styles.listMargin}>
              <h5>Vídeos que achamos que vai gostar</h5>
              <hr />
              <div className="row">
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
              </div>
            </div>
            <div className={styles.listMargin}>
              <h5>Recomendados</h5>
              <hr />
              <div className="row">
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
                <VideoThumb />
              </div>
            </div>
            <div className={styles.listMargin}>
              <h5>Canais seguidos</h5>
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

export default withRouter(Home);
