/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { numberToText } from "../../library/numberText";

import dashjs from "dashjs";
import Plyr from "plyr";
import TextareaAutosize from "react-autosize-textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAuthenticated } from "../../services/auth";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import NextVideo from "../../components/NextVideo";
import AuthModals from "../../components/AuthModals";

import styles from "./channel.module.scss";

class Channel extends Component {
  state = {
    like: false,
    dislike: false,
    following: false,
    showDescription: false,
    isAuthenticated: isAuthenticated(),
    videoTitle: this.props.match.params.id,
  };

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
    const source = "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd";
    // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
    //const dash = dashjs.MediaPlayer().create();
    const video = document.querySelector("video");
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
      <div className="content">
        <NavBar />
        <div className="wrapper">
          <SideBar />
          <div className={`page-content ${styles.replacePadding}`}>
            <img className={styles.cover} src="https://picsum.photos/1920/200" alt="capa"/>
            <div className={styles.contentPadding}>
              data
            </div>
          </div>
        </div>
        <AuthModals />
      </div>
    );
  }
}

export default withRouter(withTranslation()(Channel));
