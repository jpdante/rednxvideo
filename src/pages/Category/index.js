import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import FadeIn from "react-fade-in";
import VideoThumb from "../../components/VideoThumb";

import styles from "./category.module.scss";

class Category extends Component {
  state = {
    category: "shared.unknown",
  };

  componentWillReceiveProps(nextProps) {
    var category = "";
    switch (nextProps.match.params.category) {
      case "science":
        category = "shared.science";
        break;
      case "comedy":
        category = "shared.comedy";
        break;
      case "games":
        category = "shared.games";
        break;
      case "vlog":
        category = "shared.vlogs";
        break;
      case "sports":
        category = "shared.sports";
        break;
      case "education":
        category = "shared.education";
        break;
      default:
        category = "shared.unknown";
        break;
    }
    this.setState({
      category: category,
    });
  }

  componentDidMount() {
    var category = "";
    switch (this.props.match.params.category) {
      case "science":
        category = "shared.science";
        break;
      case "comedy":
        category = "shared.comedy";
        break;
      case "games":
        category = "shared.games";
        break;
      case "vlog":
        category = "shared.vlogs";
        break;
      case "sports":
        category = "shared.sports";
        break;
      case "education":
        category = "shared.education";
        break;
      default:
        category = "shared.unknown";
        break;
    }
    this.setState({
      category: category,
    });
  }

  render() {
    const { t } = this.props;
    return (
      <FadeIn className="page-content">
        <div className={styles.listMargin}>
          <h5>
            {t("shared.category")} {t(this.state.category)}
          </h5>
          <hr />
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
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default withRouter(withTranslation()(Category));
