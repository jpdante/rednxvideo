import React, { Component } from "react";

import { isAuthenticated } from "../../services/auth";

import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";

class AuthModals extends Component {
  render() {
    if (isAuthenticated()) {
      return <div name="authModals"></div>;
    } else {
      return (
        <div name="authModals">
          <LoginModal />
          <RegisterModal />
        </div>
      );
    }
  }
}

export default AuthModals;
