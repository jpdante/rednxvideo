import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { numberToText, timeToText } from "../../library/numberText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./nextvideo.module.scss";

class NextVideo extends Component {
  render() {
    const { t } = this.props;
    const getViews = () => {
      var number = Math.floor(Math.random() * 2000000);
      var countText = numberToText(number);
      return t("components.thumbnail.view", {
        count: number,
        countText: countText,
      });
    };
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
              <p className={styles.videoTitle}>
                Este é o titulo do video hsahdajsd sim eu sou gay
              </p>
              <div className={styles.channelName}>
                <a href="/">Nome do Canal</a>
              </div>
              <div className={styles.videoViews}>{getViews()}</div>
              <div className={styles.videoDate}>
                {t("time.ago", { time: timeToText(1586675305) })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(NextVideo);
