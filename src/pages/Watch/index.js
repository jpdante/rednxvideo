/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { numberToText } from "../../library/numberText";

import dashjs from "dashjs";
import Plyr from "plyr";
import api from "../../library/api";
import $ from "jquery";
import TextareaAutosize from "react-autosize-textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAuthenticated } from "../../services/auth";

import FadeIn from "react-fade-in";
import NextVideo from "../../components/NextVideo";

import styles from "./watch.module.scss";
import "plyr/src/sass/plyr.scss";

class Watch extends Component {
  state = {
    like: false,
    dislike: false,
    following: false,
    showDescription: false,
    isAuthenticated: isAuthenticated(),
    videoData: {
      title: "",
      channelName: "",
      channelLink: "",
      channelFollowers: 0,
      classification: 0,
    },
    comments: [],
    tempComment: "",
  };

  follow = async (e) => {
    e.preventDefault();
    if (!this.state.isAuthenticated) return;
    if (this.state.following) {
      this.setState({
        following: false,
      });
      await api.updateFollow(this.state.videoData.channelId, false);
    } else {
      this.setState({
        following: true,
      });
      await api.updateFollow(this.state.videoData.channelId, true);
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
    if (!this.state.isAuthenticated) return;
    if (this.state.like) {
      this.setState({
        like: false,
        dislike: false,
      });
      await api.updateLike(this.state.videoData.id, null);
    } else {
      this.setState({
        like: true,
        dislike: false,
      });
      await api.updateLike(this.state.videoData.id, true);
    }
  };

  dislike = async (e) => {
    e.preventDefault();
    if (!this.state.isAuthenticated) return;
    if (this.state.dislike) {
      this.setState({
        like: false,
        dislike: false,
      });
      await api.updateLike(this.state.videoData.id, null);
    } else {
      this.setState({
        like: false,
        dislike: true,
      });
      await api.updateLike(this.state.videoData.id, false);
    }
  };

  sendComment = async (e) => {
    e.preventDefault();
    if (!this.state.isAuthenticated) return;
    const { t } = this.props;
    if (this.state.tempComment.length < 10) {
      alert(t("errors.commentTooSmall"));
      return;
    }
    if (this.state.tempComment.length > 500) {
      alert(t("errors.commentTooBig"));
      return;
    }
    var escapedComment = this.state.tempComment
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const response = await api.sendComment(
      this.state.videoData.id,
      this.state.tempComment
    );
    if (response.data.success) {
      var commentsArray = this.state.comments;
      commentsArray.unshift({
        id: response.data.id,
        msg: escapedComment,
        likes: 0,
        dislikes: 0,
        accountUsername: localStorage.getItem("username"),
        accountPicture: localStorage.getItem("profilePicture"),
        isLiked: null,
      });
      this.setState({
        comments: commentsArray,
        tempComment: "",
      });
    } else {
      alert(t(response.data.message));
    }
  };

  getClassification(classification) {
    if (classification === 0) return "L";
    return classification;
  }

  getClassificationColor(classification) {
    switch (classification) {
      case 10:
        return "#0F7DC2";
      case 12:
        return "#F8C411";
      case 14:
        return "#E67824";
      case 16:
        return "#DB2827";
      case 18:
        return "#1D1815";
      default:
        return "#0C9447";
    }
  }

  async componentDidMount() {
    var response = await api.getVideo(this.props.match.params.id);
    if (response.data.success) {
      if (response.data.userInfo === undefined) {
        this.setState({
          isLoading: false,
          videoData: response.data.video,
        });
      } else {
        this.setState({
          isLoading: false,
          like: response.data.userInfo.liked,
          dislike: response.data.userInfo.disliked,
          following: response.data.userInfo.following,
          videoData: response.data.video,
          comments: [],
        });
      }
      response = await api.getComments(this.state.videoData.id);
      if (response.data.success) {
        var commentsArray = this.state.comments;
        response.data.comments.forEach((comment) => {
          commentsArray.push(comment);
        });
        this.setState({
          comments: commentsArray,
        });
      } else {
        console.error("Failed to get comments!");
        console.error(response.data);
      }
    } else {
      this.setState({
        isLoading: false,
        like: 0,
        dislike: 0,
        following: 0,
        videoData: {
          title: "Couldn't load video!",
          channelName: "Couldn't load channel!",
          channelLink: "/",
          channelFollowers: 0,
          classification: 0,
        },
      });
    }
    //const source = "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd";
    // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
    //const dash = dashjs.MediaPlayer().create();
    const video = document.querySelector("video");
    //dash.updateSettings({ debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE } });
    //dash.initialize(video, source, true);

    // Update caption tracks after initializing Plyr to get the generated captions
    // For more options see: https://github.com/sampotts/plyr/#options
    const player = new Plyr(video, {
      captions: { active: true, update: true },
      /*quality: {
        forced: true,
        default: 480,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
        onChange: null,
      },*/
    });

    this.setState({
      player: player,
      sourceData: [
        /*{
          src: "http://localhost:3000/assets/video/1080.mpd",
          size: 1080,
          mode: "mpd", // How to analyze
        },
        {
          src: "http://localhost:3000/assets/video/480.mpd",
          size: 480,
          mode: "mpd", // How to analyze
        }*/
      ],
    });

    player.source = {
      // type: 'audio',
      type: "video",
      title: "Titulo",
      sources: this.state.sourceData,
    };

    player.on("qualitychange", (event) => {
      this.initPlayer();
    });
    this.initPlayer();
  }

  initPlayer() {
    const { sourceData, player } = this.state;
    console.log(player);
    $.each(sourceData, function () {
      const video = document.querySelector("video");
      $.each(sourceData, function () {
        // dash Adaptation
        if (
          this.mode === "mpd" &&
          this.size === player.config.quality.selected
        ) {
          // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
          const dash = dashjs.MediaPlayer().create();
          dash.updateSettings({
            debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE },
          });
          dash.initialize(video, this.src, true);
          // Expose player and dash so they can be used from the console
          window.player = player;
          window.dash = dash;
        }
      });
    });
  }

  render() {
    const { t } = this.props;
    return (
      <FadeIn className={`${styles.watchContent} page-content`}>
        <div className={`${styles.container} row`}>
          <div
            className={`${styles.playerContainer} col-sm-12 col-md-12 col-lg-12 col-xl-9`}
          >
            {/*<video
                  className={styles.player}
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
                  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
                ></video>*/}
            <video
              className={styles.player}
              controls
              crossOrigin="true"
              playsInline
              poster={`/assets/${this.state.videoData.thumb}`}
            ></video>
            <div className={`${styles.videoTitleContainer}`}>
              <div className={`${styles.videoIcon}`}>
                <img src={`/assets/${this.state.videoData.icon}`} alt="game" />
              </div>
              <div
                className={`${styles.videoClassification}`}
                style={{
                  backgroundColor: this.getClassificationColor(
                    this.state.videoData.classification
                  ),
                }}
              >
                {this.getClassification(this.state.videoData.classification)}
              </div>
              <div className={`${styles.videoTitle}`}>
                <h5>{this.state.videoData.title}</h5>
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <div className="row">
                <div className={`${styles.channelImage} col-lg-12 col-xl-6`}>
                  <Link to={`/channel/${this.state.videoData.channelLink}`}>
                    <img
                      src={`/assets/${this.state.videoData.channelPicture}`}
                      alt="Avatar do Canal"
                    />
                  </Link>
                  <div className={styles.channelNameContainer}>
                    <div className={styles.channelName}>
                      <Link to={`/channel/${this.state.videoData.channelLink}`}>
                        {this.state.videoData.channelName}
                      </Link>
                    </div>
                    <div className={styles.channelFollowers}>
                      {t("pages.watch.followers", {
                        countText: numberToText(
                          this.state.videoData.channelFollowers
                        ),
                      })}
                    </div>
                  </div>
                </div>
                <div className={`${styles.channelButtons} col-lg-12 col-xl-6`}>
                  <button
                    type="button"
                    className={`btn ${this.state.like ? "btn-primary" : ""}`}
                    onClick={this.like}
                  >
                    <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />
                    &nbsp;&nbsp; {t("shared.like")}
                  </button>
                  <button
                    type="button"
                    className={`btn ${this.state.dislike ? "btn-primary" : ""}`}
                    onClick={this.dislike}
                  >
                    <FontAwesomeIcon
                      icon="thumbs-down"
                      className={styles.icon}
                    />
                    &nbsp;&nbsp; {t("shared.dislike")}
                  </button>
                  <button type="button" className="btn">
                    <FontAwesomeIcon icon="share" className={styles.icon} />
                    &nbsp;&nbsp; {t("shared.share")}
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
                  <button
                    type="button"
                    className={`btn ${
                      this.state.following
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={this.follow}
                  >
                    <FontAwesomeIcon icon="heart" className={styles.icon} />
                    &nbsp;&nbsp;{" "}
                    {this.state.following
                      ? t("shared.following")
                      : t("shared.follow")}
                  </button>
                </div>
              </div>
              <div className={`${styles.card} card`}>
                <div
                  className={`${styles.description} card-body ${
                    this.state.showDescription ? styles.active : ""
                  }`}
                >
                  {this.state.videoData.description}
                </div>
                <button
                  type="button"
                  className={`btn`}
                  onClick={this.toggleDescription}
                >
                  <FontAwesomeIcon
                    icon={this.state.showDescription ? "eye-slash" : "eye"}
                    className={styles.icon}
                  />
                  &nbsp;&nbsp;{" "}
                  {this.state.showDescription
                    ? t("pages.watch.hideDescription")
                    : t("pages.watch.showDescription")}
                </button>
              </div>
            </div>
            <div className={styles.commentsContainer}>
              <div className={styles.postComment}>
                {this.state.isAuthenticated ? (
                  <div className={`${styles.media} media`}>
                    <img
                      src={`/assets/${localStorage.getItem("profilePicture")}`}
                      alt="profile pic"
                    />
                    <div className={`${styles.authComment} media-body`}>
                      <TextareaAutosize
                        className="form-control"
                        placeholder={t("pages.watch.commentPlaceHolder")}
                        rows={1}
                        onChange={(e) => {
                          if (e.target.value.length > 500) {
                            e.target.value = e.target.value.substring(0, 500);
                          }
                          this.setState({ tempComment: e.target.value });
                        }}
                        value={this.state.tempComment}
                      />
                      <small>
                        Voce tem {500 - this.state.tempComment.length}{" "}
                        caracteres restantes.
                      </small>
                      <button
                        className={`${styles.sendBtn} btn btn-primary btn-sm`}
                        disabled={this.state.tempComment.length < 10}
                        onClick={this.sendComment}
                      >
                        {t("pages.watch.send")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <h5 className={styles.notAuthenticated}>
                    {t("pages.watch.needLogin.youNeed")}{" "}
                    <a
                      role="button"
                      data-toggle="modal"
                      data-target="#loginModal"
                    >
                      {t("pages.watch.needLogin.toLogin")}
                    </a>{" "}
                    {t("pages.watch.needLogin.toSend")}
                  </h5>
                )}
              </div>
              <ul className="list-unstyled">
                {this.state.comments.map((comment) => (
                  <li className={`${styles.media} media`} key={comment.id}>
                    <img src={`/assets/${comment.accountPicture}`} alt="..." />
                    <div
                      className="media-body"
                      dangerouslySetInnerHTML={{
                        __html: `<a className="mt-0 mb-1">${comment.accountUsername}</a>
                      ${comment.msg}`,
                      }}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className={`${styles.videosContainer} col-sm-12 col-md-12 col-lg-12 col-xl-3`}
          >
            <div className={`row`}>
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
              <NextVideo />
            </div>
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default withRouter(withTranslation()(Watch));
