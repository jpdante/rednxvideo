import React, { Component } from "react";
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./videothumb.module.scss";

class VideoThumb extends Component {
  render() {
    return (
      <div
        className={`${styles.videoThumb} col-xs-12 col-sm-12 col-lg-6 col-xl-3`}
      >
        <div className={`${styles.video}`}>
          <div className={styles.overlay}>
            <div className={styles.playIcon}>
              <FontAwesomeIcon icon="play" size="lg" />
            </div>
            <div className={styles.spaceConsumer}></div>
            <div className={styles.videoData}>
              <div className={`${styles.infoOverlay} float-left`}>
                <p>50 mi vizualicacoes</p>
                <p>há 5 dias</p>
              </div>
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
        <div className={styles.videoInfo}>
          <div className={styles.channelImage}>
            <img src="https://picsum.photos/256/256" alt="Avatar do Canal" />
          </div>
          <div className={styles.videoFooter}>
            <p className={styles.videoTitle}><Link to="/watch">Este é o titulo do video</Link></p>
            <div className={styles.channelName}>
              <a href="/">Nome do Canal</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoThumb;
