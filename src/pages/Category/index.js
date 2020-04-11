import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import VideoThumb from "../../components/VideoThumb";
import AuthModals from "../../components/AuthModals";

import styles from "./category.module.scss";

class Category extends Component {
  state = {
    category: "Esportes",
  };

  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);
    var category = "";
    switch (query.get("c")) {
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
      <div className="fix-heigth">
        <NavBar />
        <div className="sidebar-wrapper">
          <SideBar />
          <div className={`${styles.categoryContent}`}>
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
          </div>
        </div>
        <AuthModals />
      </div>
    );
  }
}

export default withRouter(Category);
