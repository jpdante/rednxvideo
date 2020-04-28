import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import api from "../../services/api";

import VideoThumb from "../../components/VideoThumb";
import Loading from "../Loading";

import styles from "./home.module.scss";
import FadeIn from "react-fade-in";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      videos: [],
    };
  }

  async componentDidMount() {
    console.log("Getting data...");
    const response = await api.get("/feed/newvideos");
    console.log(response.data[0]);
    this.setState({
      isLoading: false,
      videos: response.data,
    });
  }

  render() {
    console.log("Rendering....");
    const { t } = this.props;
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <FadeIn className="page-content">
          <div className={styles.listMargin}>
            <h5>{t("pages.home.videosai")}</h5>
            <hr />
            <div className="row">
              {this.state.videos.map((item, key) => (
                <VideoThumb key={item.guid} data={item} />
              ))}
            </div>
          </div>
          {/*<div className={styles.listMargin}>
          <h5>{t("shared.recommended", { count: 2 })}</h5>
          <hr />
          <div className="row">
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
          </div>
        </div>
        <div className={styles.listMargin}>
          <h5>{t("pages.home.followed")}</h5>
          <hr />
          <div className="row">
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
            <VideoThumb />
          </div>
    </div>*/}
        </FadeIn>
      );
    }
  }
}

export default withRouter(withTranslation()(Home));
