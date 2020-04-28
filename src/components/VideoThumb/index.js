import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { numberToText, timeToText, numberToTime } from "../../library/numberText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./videothumb.module.scss";

class VideoThumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.data.title,
      time: props.data.time,
      channelName: props.data.channelName,
      channelLink: props.data.channelLink,
      channelPicture: props.data.channelPicture,
      guid: props.data.guid,
      views: props.data.views,
      thumb: props.data.thumb,
      creationDate: props.data.creationDate
    };
  }

  render() {
    const { t } = this.props;
    return (
      <div
        className={`${styles.videoThumb} col-xs-12 col-sm-12 col-lg-6 col-xl-3`}
      >
        <Link
          to={`/watch/${this.state.guid}`}
          className={`${styles.videoLink}`}
        >
          <div className={`${styles.video}`}>
            <div className={styles.overlay}>
              <div className={styles.playIcon}>
                <FontAwesomeIcon icon="play" size="lg" />
              </div>
              <div className={styles.spaceConsumer}></div>
              <div className={styles.videoData}>
                <div className={`${styles.infoOverlay} float-left`}>
                  <p>{t("components.thumbnail.view", { count: this.state.views, countText: numberToText(this.state.views) })}</p>
                  <p>{t("time.ago", { time: timeToText(this.state.creationDate) })}</p>
                </div>
                <div
                  className={`${styles.infoOverlay} ${styles.playTime} float-right`}
                >
                  {numberToTime(this.state.time)}
                </div>
              </div>
            </div>
            <img
              src={this.state.thumb}
              width="1280"
              height="720"
              alt="Thumbnail do video"
              className={styles.image}
            />
          </div>
        </Link>
        <div className={styles.videoInfo}>
          <div className={styles.channelImage}>
            <Link to={`/channel/${this.state.channelLink}`}>
              <img src={this.state.channelPicture} alt="Avatar do Canal" />
            </Link>
          </div>
          <div className={styles.videoFooter}>
            <p className={styles.videoTitle}>
              <Link to={`/watch/${this.state.guid}`}>
                {this.state.title}
              </Link>
            </p>
            <div className={styles.channelName}>
              <Link to={`/channel/${this.state.channelLink}`}>{this.state.channelName}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(VideoThumb);
