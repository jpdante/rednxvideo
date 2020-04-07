import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./nextvideo.module.scss";

class NextVideo extends Component {
  render() {
    return (
      <div className={`${styles.videoThumb} col-12`}>
        <div className={`no-gutters row`}>
          <div className="col-6">
            <div className={`${styles.video}`}>
              <div className={styles.overlay}>
                <div className={styles.playIcon}>
                  <FontAwesomeIcon icon="play" size="lg" />
                </div>
                <div className={styles.spaceConsumer}></div>
                <div className={styles.videoData}>
                  <div
                    className={`${styles.infoOverlay} ${styles.playTime} float-right`}
                  >
                    02:07
                  </div>
                </div>
              </div>
              <img
                src="https://picsum.photos/1280/720"
                alt="Thumbnail do video"
                className={styles.image}
              />
            </div>
          </div>
          <div className="col-6">
            <div className={styles.videoInfo}>
              <div className={styles.videoFooter}>
                <p className={styles.videoTitle}>
                  Este é o titulo do video hsahdajsd sim eu sou gay
                </p>
                <div className={styles.channelName}>
                  <a href="/">Nome do Canal</a>
                </div>
                <div className={styles.videoViews}>50 mi visualizações</div>
                <div className={styles.videoDate}>há 50 dias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NextVideo;
