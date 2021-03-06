// React Imports
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

// Other Imports
import api from "../../library/api";
import FadeIn from "react-fade-in";

// Components
import VideoThumb from "../../components/VideoThumb";
import Loading from "../Loading";

// Style
import styles from "./home.module.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      videos: [],
    };
  }

  async componentDidMount() {
    const response = await api.getNewVideos();
    this.setState({
      isLoading: false,
      videos: response.data,
    });
  }

  render() {
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
