/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { numberToText } from "../../library/numberText";

//import dashjs from "dashjs";
import Plyr from "plyr";
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
            <div
              id="player"
              data-plyr-provider="youtube"
              data-plyr-embed-id="1La4QzGeaaQ"
            ></div>
            <div className={`${styles.videoTitleContainer}`}>
              <div className={`${styles.videoIcon}`}>
                <img src="https://picsum.photos/66/66" alt="game" />
              </div>
              <div className={`${styles.videoClassification}`}>L</div>
              <div className={`${styles.videoTitle}`}>
                <h5>{this.state.videoTitle}</h5>
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <div className="row">
                <div className={`${styles.channelImage} col-lg-12 col-xl-6`}>
                  <Link to="/channel/ellisiumx">
                    <img
                      src="https://picsum.photos/256/256"
                      alt="Avatar do Canal"
                    />
                  </Link>
                  <div className={styles.channelNameContainer}>
                    <div className={styles.channelName}>
                      <Link to="/channel/ellisiumx">
                        Este é o Nome do Canal
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
                    className={`btn ${this.state.dislike ? "btn-primary" : ""}`}
                    onClick={this.dislike}
                  >
                    <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />
                    &nbsp;&nbsp; {t("shared.like")}
                  </button>
                  <button
                    type="button"
                    className={`btn ${this.state.like ? "btn-primary" : ""}`}
                    onClick={this.like}
                  >
                    <FontAwesomeIcon
                      icon="thumbs-down"
                      className={styles.icon}
                    />
                    &nbsp;&nbsp; {t("shared.dislike")}
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
                  <button type="button" className="btn btn-outline-danger">
                    <FontAwesomeIcon icon="share" className={styles.icon} />
                    &nbsp;&nbsp; {t("shared.share")}
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
              <div className="card">
                <div
                  className={`${styles.description} card-body ${
                    this.state.showDescription ? styles.active : ""
                  }`}
                >
                  <p>
                    Daughter - Medicine (Sound Remedy Remix) ⬙ FAVOURITES ON
                    <br />
                    <br />
                    SPOTIFY ⬙ ⇥ http://mrsuicidesheep.com/favourites
                    <br />
                    <br />
                    Phenomenal remix! Purchase the
                    <br />
                    original...http://bit.ly/1vo3xcp Download the remix
                    <br />
                    here... https://soundremedy.toneden.io/spotli... Released
                    <br />
                    by Glassnote Music http://glassnotemusic.com
                    <br />
                    <br />
                    https://www.facebook.com/glassnote
                    <br />
                    https://twitter.com/glassnotemusic Daughter
                    <br />
                    http://soundcloud.com/ohdaughter
                    <br />
                    http://www.facebook.com/ohdaughter
                    <br />
                    http://twitter.com/ohdaughter Sound Remedy
                    <br />
                    http://soundcloud.com/soundremedy
                    <br />
                    http://www.soundremedy.com/
                    <br />
                    http://www.facebook.com/soundremedy
                    <br />
                    https://twitter.com/SoundRemedy Sheepy twitter
                    <br />
                    https://twitter.com/MrSuicideSheep Artwork by ? If anyone
                    <br />
                    <br />
                    knows who created this image please link me to their page.
                    <br />
                    <br />
                    ⬗ Sheepy Store ⬗ ⇥ http://mrsuicidesheep.com/store ⬖
                    <br />
                    Submit Music & Art ⬖ ⇥ http://mrsuicidesheep.com/submit ⬙
                    <br />
                    Sheepy Instagram ⬙ ⇥ http://mrsuicidesheep.com/insta ⬘
                    <br />
                    Spotify: Channel Uploads ⬘ ⇥<br />
                    http://mrsuicidesheep.com/channeluploads ⬗ Spotify:
                    <br />
                    Seeking Blue ⬗ ⇥ http://mrsuicidesheep.com/skblueplaylist
                  </p>
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
                      src="https://randomuser.me/api/portraits/men/65.jpg"
                      alt="profile pic"
                    />
                    <div className="media-body">
                      <TextareaAutosize
                        className="form-control"
                        placeholder={t("pages.watch.commentPlaceHolder")}
                        rows="1"
                      />
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
                <li className={`${styles.media} media`}>
                  <img src="https://picsum.photos/67/67" alt="..." />
                  <div className="media-body">
                    <a className="mt-0 mb-1" href="/">
                      Nome do Canal
                    </a>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin. Cras purus odio, vestibulum
                    in vulputate at, tempus viverra turpis. Fusce condimentum
                    nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                    in faucibus.
                  </div>
                </li>
                <li className={`${styles.media} media`}>
                  <img src="https://picsum.photos/76/76" alt="..." />
                  <div className="media-body">
                    <a className="mt-0 mb-1" href="/">
                      Nome do Canal
                    </a>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin. Cras purus odio, vestibulum
                    in vulputate at, tempus viverra turpis. Fusce condimentum
                    nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                    in faucibus.
                  </div>
                </li>
                <li className={`${styles.media} media`}>
                  <img src="https://picsum.photos/86/86" alt="..." />
                  <div className="media-body">
                    <a className="mt-0 mb-1" href="/">
                      Nome do Canal
                    </a>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin. Cras purus odio, vestibulum
                    in vulputate at, tempus viverra turpis. Fusce condimentum
                    nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                    in faucibus.
                  </div>
                </li>
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
