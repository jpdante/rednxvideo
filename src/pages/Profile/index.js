/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";

import FadeIn from "react-fade-in";

import Loading from "../Loading/";

import api from "../../library/api";
import { isAuthenticated } from "../../services/auth";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: "",
      channelLink: "",
      captcha: "",
      error: "",
      errorData: {},
      loadingPage: true,
      loading: false,
    };
  }

  async componentDidMount() {
    const response = await api.canCreateNewChannel();
    if (response.data.success) {
      this.setState({
        loadingPage: false,
        allowCreate: response.data.allowCreate,
      });
    } else {
      this.setState({
        loadingPage: false,
        allowCreate: false,
      });
    }
  }

  render() {
    const { t } = this.props;
    if (isAuthenticated()) {
      if (this.state.loadingPage) {
        return <Loading />;
      } else {
        return (
          <FadeIn className="page-content" childClassName="fix-fadein">
            <div className="container mt-4">
              <div className="row">
                <div className="col-2">
                  <div
                    className="nav flex-column nav-pills"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-toggle="pill"
                      href="#v-pills-home"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      {t("pages.profile.profile")}
                    </a>
                    <a
                      className="nav-link"
                      id="v-pills-security-tab"
                      data-toggle="pill"
                      href="#v-pills-security"
                      role="tab"
                      aria-controls="v-pills-security"
                      aria-selected="false"
                    >
                      {t("pages.profile.security")}
                    </a>
                    <a
                      className="nav-link"
                      id="v-pills-messages-tab"
                      data-toggle="pill"
                      href="#v-pills-messages"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      {t("pages.profile.settings")}
                    </a>
                  </div>
                </div>
                <div className="col-10">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <h4>{t("pages.profile.profile")}</h4>
                      <hr />
                      <img
                        src={`/assets/${localStorage.getItem(
                          "profilePicture"
                        )}`}
                        className="rounded mx-auto d-inline-block align-top"
                        alt="Profile"
                      />
                      <button
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#uploadAvatarModal"
                      >
                        {t("components.navbar.language")}
                      </button>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-security"
                      role="tabpanel"
                      aria-labelledby="v-pills-security-tab"
                    >
                      <h4>{t("pages.profile.changePassword")}</h4>
                      <hr />
                      <div className="form-group">
                        <label>{t("pages.profile.oldPassword")}</label>
                        <input
                          type="password"
                          className="form-control"
                          aria-describedby="emailHelp"
                          required
                          onChange={(e) =>
                            this.setState({ oldPassword: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>{t("pages.profile.newPassword")}</label>
                        <input
                          type="password"
                          className="form-control"
                          aria-describedby="emailHelp"
                          required
                          onChange={(e) =>
                            this.setState({ oldPassword: e.target.value })
                          }
                        />
                        <small className="form-text text-muted">
                          {t("modals.passwordMinLength")}
                        </small>
                      </div>
                      <div className="form-group">
                        <label>{t("pages.profile.confirmNewPassword")}</label>
                        <input
                          type="password"
                          className="form-control"
                          aria-describedby="emailHelp"
                          required
                          onChange={(e) =>
                            this.setState({ oldPassword: e.target.value })
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mx-1"
                        onClick={this.login}
                      >
                        {this.state.loading ? (
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          t("pages.profile.updatePassword")
                        )}
                      </button>
                      <Link
                        className="form-check-label mx-1"
                        to="/forgot-password"
                      >
                        {t("modals.forgotPassword")}
                      </Link>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-messages"
                      role="tabpanel"
                      aria-labelledby="v-pills-messages-tab"
                    >
                      ...
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-settings"
                      role="tabpanel"
                      aria-labelledby="v-pills-settings-tab"
                    >
                      ...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        );
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default withTranslation()(Profile);
