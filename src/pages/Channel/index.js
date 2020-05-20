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
import Loading from "../Loading";
import api from "../../library/api";

import styles from "./channel.module.scss";

class Channel extends Component {
  state = {
    like: false,
    dislike: false,
    following: false,
    showDescription: false,
    isAuthenticated: isAuthenticated(),
    channelLink: this.props.match.params.channel,
    isLoading: true,
    channel: {
      id: 0,
      name: "",
      link: "",
      picture: "",
      followers: 0,
      views: 0,
      following: false,
    },
  };

  async componentWillReceiveProps(nextProps) {
    this.setState({
      like: false,
      dislike: false,
      following: false,
      showDescription: false,
      isAuthenticated: isAuthenticated(),
      channelLink: nextProps.match.params.channel,
      isLoading: true,
    });
    await this.loadChannel();
  }

  async componentDidMount() {
    await this.loadChannel();
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

  async loadChannel() {
    const response = await api.getChannel(this.state.channelLink);
    if (response.data.success) {
      this.setState({
        isLoading: false,
        channel: response.data.channel,
      });
    } else {
      console.error("Failed to get channel '" + this.state.channelLink + "'");
      this.setState({
        isLoading: true,
        channel: {
          id: 0,
          name: "",
          link: "",
          picture: "",
          followers: 0,
          views: 0,
          following: false,
        },
      });
    }
  }

  follow = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) return;
    var channel = this.state.channel;
    if (this.state.channel.following) {
      channel.following = false;
      await api.updateFollow(this.state.channel.id, false);
    } else {
      channel.following = true;
      await api.updateFollow(this.state.channel.id, true);
    }
    this.setState({
      channel: channel,
    });
  };

  render() {
    const { t } = this.props;
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <FadeIn className={`page-content ${styles.replacePadding}`}>
          <img
            className={styles.cover}
            src={`/assets/${this.state.channel.cover}`}
            alt="capa"
          />
          <div className={styles.contentPadding}>
            <div className={styles.channelMenu}>
              <div className={`row`}>
                <div className={`${styles.channelLogo} col-lg-12 col-xl-6`}>
                  <img
                    src={`/assets/${this.state.channel.picture}`}
                    alt="Avatar do Canal"
                  />
                  <div className={styles.channelNameContainer}>
                    <div className={styles.channelName}>
                      <Link to={`/channel/${this.state.channel.link}`}>
                        {this.state.channel.name}
                      </Link>
                    </div>
                    <div className={styles.channelFollowers}>
                      {t("pages.watch.followers", {
                        countText: numberToText(this.state.channel.followers),
                      })}
                    </div>
                  </div>
                </div>
                <div className={`${styles.channelButtons} col-lg-12 col-xl-6`}>
                  {isAuthenticated() && (
                    <button
                      type="button"
                      className={`btn ${
                        this.state.channel.following
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={this.follow}
                    >
                      <FontAwesomeIcon icon="heart" className={styles.icon} />
                      &nbsp;&nbsp;{" "}
                      {this.state.channel.following
                        ? t("shared.following")
                        : t("shared.follow")}
                    </button>
                  )}
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
                <div className="row"></div>
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
}

export default withRouter(withTranslation()(Channel));
