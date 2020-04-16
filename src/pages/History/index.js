import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import VideoThumb from "../../components/VideoThumb";
import AuthModals from "../../components/AuthModals";

import styles from "./history.module.scss";

class History extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="content">
        <NavBar />
        <div className="wrapper">
          <SideBar />
          <div className="page-content">
            <h2>User History</h2>
          </div>
        </div>
        <AuthModals />
      </div>
    );
  }
}

export default withRouter(withTranslation()(History));
