import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import FadeIn from "react-fade-in";

//import styles from "./history.module.scss";

class History extends Component {
  render() {
    //const { t } = this.props;
    return (
      <FadeIn className="page-content">
        <h2>User History</h2>
      </FadeIn>
    );
  }
}

export default withRouter(withTranslation()(History));
