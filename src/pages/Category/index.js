import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import FadeIn from "react-fade-in";
import VideoThumb from "../../components/VideoThumb";

import styles from "./category.module.scss";

class Category extends Component {
  state = {
    category: "Esportes",
  };

  componentDidMount() {
    var category = "";
    switch (this.props.match.params.category) {
      case "science":
        category = "Ciência";
        break;
      case "comedy":
        category = "Comédia";
        break;
      case "games":
        category = "Jogos";
        break;
      case "vlog":
        category = "Vlogs";
        break;
      case "sports":
        category = "Esportes";
        break;
      case "education":
        category = "Educação";
        break;
      default:
        category = "Desconhecida";
        break;
    }
    this.setState({
      category: category,
    });
  }

  render() {
    return (
      <FadeIn className="page-content">
        <div className={styles.listMargin}>
          <h5>Categoria {this.state.category}</h5>
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

export default withRouter(Category);
