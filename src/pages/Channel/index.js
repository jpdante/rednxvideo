/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { numberToText } from "../../library/numberText";

//import dashjs from "dashjs";
import Plyr from "plyr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAuthenticated } from "../../services/auth";

import FadeIn from "react-fade-in";
import VideoThumb from "../../components/VideoThumb";

import styles from "./channel.module.scss";

class Channel extends Component {
  state = {
    like: false,
    dislike: false,
    following: false,
    showDescription: false,
    isAuthenticated: isAuthenticated(),
    channel: this.props.match.params.channel,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      like: false,
      dislike: false,
      following: false,
      showDescription: false,
      isAuthenticated: isAuthenticated(),
      channel: nextProps.match.params.channel,
    });
  }

  follow = async (e) => {
    e.preventDefault();
    if (this.state.following) {
      this.setState({
        following: false,
      });
    } else {
      this.setState({
        following: true,
      });
    }
  };

  toggleDescription = async (e) => {
    e.preventDefault();
    if (this.state.showDescription) {
      this.setState({
        showDescription: false,
      });
    } else {
      this.setState({
        showDescription: true,
      });
    }
  };

  like = async (e) => {
    e.preventDefault();
    if (this.state.like) {
      this.setState({
        like: false,
        dislike: false,
      });
    } else {
      this.setState({
        like: true,
        dislike: false,
      });
    }
  };

  dislike = async (e) => {
    e.preventDefault();
    if (this.state.dislike) {
      this.setState({
        like: false,
        dislike: false,
      });
    } else {
      this.setState({
        like: false,
        dislike: true,
      });
    }
  };

  componentDidMount() {
    //const source = "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd";
    // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
    //const dash = dashjs.MediaPlayer().create();
    //const video = document.querySelector("video");
    //dash.updateSettings({ 'debug': { 'logLevel': dashjs.Debug.LOG_LEVEL_NONE }});
    //dash.initialize(video, source, true);

    // Update caption tracks after initializing Plyr to get the generated captions
    // For more options see: https://github.com/sampotts/plyr/#options
    /*const player = new Plyr(video, {
      captions: { active: true, update: true },
    });*/
    const player = new Plyr("#player");

    // Expose player and dash so they can be used from the console
    window.player = player;
    //window.dash = dash;
  }

  render() {
    const { t } = this.props;
    return (
      <FadeIn className={`page-content ${styles.replacePadding}`}>
        <img
          className={styles.cover}
          src="https://picsum.photos/1920/200"
          alt="capa"
        />
        <div className={styles.contentPadding}>
          <div className={styles.channelMenu}>
            <div className={`row`}>
              <div className={`${styles.channelLogo} col-lg-12 col-xl-6`}>
                <img
                  src="https://picsum.photos/256/256"
                  alt="Avatar do Canal"
                />
                <div className={styles.channelNameContainer}>
                  <div className={styles.channelName}>
                    <Link to={`/channel/${this.state.channel}`}>
                      {this.state.channel}
                    </Link>
                  </div>
                  <div className={styles.channelFollowers}>
                    {t("pages.watch.followers", {
                      countText: numberToText(108_000),
                    })}
                  </div>
                </div>
              </div>
              <div className={`${styles.channelButtons} col-lg-12 col-xl-6`}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.follow}
                >
                  <FontAwesomeIcon icon="heart" className={styles.icon} />
                  &nbsp;&nbsp;{" "}
                  {this.state.following
                    ? t("shared.following")
                    : t("shared.follow")}
                </button>
                <button
                  type="button"
                  className="btn"
                  data-toggle="modal"
                  data-target="#reportModal"
                  title={t("shared.report")}
                >
                  <FontAwesomeIcon icon="flag" className={styles.icon} />
                </button>
              </div>
            </div>
            <ul
              className="nav nav-pills mb-3 justify-content-center"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Videos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active text-center"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h4>Custom Content</h4>
              {/*<div className="row">
                    <VideoThumb />
                    <VideoThumb />
                    <VideoThumb />
                    <VideoThumb />
                      </div>*/}
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
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
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              Contact Information:
              <br />
              Email:{" "}
              <a href="mailto:batata@tryhosting.com.br">
                batata@tryhosting.com.br
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default withRouter(withTranslation()(Channel));
