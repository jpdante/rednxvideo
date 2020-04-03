import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import dashjs from "dashjs";
import Plyr from "plyr";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import NextVideo from "../../components/NextVideo";
import AuthModals from "../../components/AuthModals";

import styles from "./watch.module.scss";

class Watch extends Component {
  componentDidMount() {
    //const source = "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd";
    // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
    //const dash = dashjs.MediaPlayer().create();
    const video = document.querySelector("video");
    //dash.updateSettings({ 'debug': { 'logLevel': dashjs.Debug.LOG_LEVEL_NONE }});
    //dash.initialize(video, source, true);

    // Update caption tracks after initializing Plyr to get the generated captions
    // For more options see: https://github.com/sampotts/plyr/#options
    const player = new Plyr(video, {
      captions: { active: true, update: true },
    });

    // Expose player and dash so they can be used from the console
    window.player = player;
    //window.dash = dash;
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="sidebar-wrapper">
          <SideBar />
          <div className={`${styles.watchContent}`}>
            <div className={`${styles.container} row`}>
              <div className={`${styles.player} col-sm-12 col-md-9 col-lg-9`}>
                <video
                  className={styles.player}
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
                  poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"
                ></video>
                <div className={`${styles.videoTitleContainer}`}>
                  <div className={`${styles.videoIcon}`}>
                    <img src="https://picsum.photos/66/66" alt="game" />
                  </div>
                  <div className={`${styles.videoClassification}`}>L</div>
                  <div className={`${styles.videoTitle}`}>
                    <h5>Este é o titulo do video</h5>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.videosContainer} col-sm-12 col-md-3 col-lg-3`}
              >
                <div className={`row`}>
                  <NextVideo />
                  <NextVideo />
                  <NextVideo />
                  <NextVideo />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AuthModals />
      </div>
    );
  }
}

export default withRouter(Watch);
