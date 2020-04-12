import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { numberToText, timeToText } from "../../library/numberText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./videothumb.module.scss";

class VideoThumb extends Component {
  render() {
    const getViews = () => {
      var number = Math.floor(Math.random() * 2000000);
      var countText = numberToText(number);
      return t("components.thumbnail.view", {
        count: number,
        countText: countText,
      });
    };
    const { t } = this.props;
    return (
      <div
        className={`${styles.videoThumb} col-xs-12 col-sm-12 col-lg-6 col-xl-3`}
      >
        <Link to="/watch/Este é o titulo do video" className={`${styles.videoLink}`}>
          <div className={`${styles.video}`}>
            <div className={styles.overlay}>
              <div className={styles.playIcon}>
                <FontAwesomeIcon icon="play" size="lg" />
              </div>
              <div className={styles.spaceConsumer}></div>
              <div className={styles.videoData}>
                <div className={`${styles.infoOverlay} float-left`}>
                  <p>{getViews()}</p>
                  <p>{t("time.ago", { time: timeToText(1586675305) })}</p>
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
        </Link>
        <div className={styles.videoInfo}>
          <div className={styles.channelImage}>
            <Link to="/channel/ellisiumx">
              <img src="https://picsum.photos/256/256" alt="Avatar do Canal" />
            </Link>
          </div>
          <div className={styles.videoFooter}>
            <p className={styles.videoTitle}>
              <Link to="/watch/Este é o titulo do video">Este é o titulo do video</Link>
            </p>
            <div className={styles.channelName}>
              <Link to="/channel/ellisiumx">Nome do Canal</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(VideoThumb);
