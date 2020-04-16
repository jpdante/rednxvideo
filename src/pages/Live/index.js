import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import VideoThumb from "../../components/VideoThumb";
import AuthModals from "../../components/AuthModals";

import styles from "./live.module.scss";

class Live extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="content">
        <NavBar />
        <div className="wrapper">
          <SideBar />
          <div className="page-content text-center">
            <br/>
            <br/>
            <br/>
            <img src="/assets/erro.svg" alt="error" width="100"></img>
            <br/>
            <br/>
            <h3>{t("pages.live.error")}</h3>
          </div>
        </div>
        <AuthModals />
      </div>
    );
  }
}

export default withRouter(withTranslation()(Live));
