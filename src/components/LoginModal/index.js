/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import $ from "jquery";
import api from "../../services/api";
import { login } from "../../services/auth";

import styles from "./loginmodal.module.scss";

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  handleRegisterButton() {
    $("#loginModal").modal("hide");
    $("#registerModal").modal("show");
  }

  handleLoginButton() {
    $("#registerModal").modal("hide");
    $("#loginModal").modal("show");
  }

  handleSignIn = async (e) => {
    e.preventDefault();
    this.setState({
      error: "",
      loading: false,
    });
    const { email, password } = this.state;
    if (!email) {
      this.setState({ error: "errors.emailEmpty" });
      return;
    }
    if (!password) {
      this.setState({ error: "errors.passwordEmpty" });
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await api.post("/api/login", {
        email,
        password,
        captcha: "none",
      });
      this.setState({ loading: false });
      if (response.data.success) {
        login(response.data.token);
        window.location.reload();
      } else {
        this.setState({
          error: response.data.message,
          errorData: response.data,
        });
      }
    } catch (err) {
      this.setState({ loading: false });
      this.setState({
        error: "errors.loginError",
      });
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal fade"
        id="loginModal"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className={`${styles.loginModal} modal-body`}>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title text-center w-100">
                <span style={{ color: "#B10003" }}>Red</span>NX
              </h4>
              <div className={`${styles.bar}`}>
                <div>
                  <div
                    className={`${styles.button} ${styles.active} float-left`}
                  >
                    <a
                      className={`text-center`}
                      role="button"
                      onClick={this.handleLoginButton}
                    >
                      {t("components.navbar.login")}
                    </a>
                    <hr />
                  </div>
                  <div className={`${styles.button} float-left`}>
                    <a
                      className={`text-center`}
                      role="button"
                      onClick={this.handleRegisterButton}
                    >
                      {t("components.navbar.register")}
                    </a>
                    <hr />
                  </div>
                  <div className={`${styles.button} float-none`}>&nbsp;</div>
                </div>
                <hr />
              </div>
              <form className={styles.form} onSubmit={this.handleSignIn}>
                {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    {t(this.state.error, this.state.errorData)}
                  </div>
                )}
                <div className="form-group">
                  <label>{t("modals.email")}</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder={t("modals.email")}
                    required
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>{t("modals.password")}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder={t("modals.password")}
                    required
                    minlength="8"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <small className="form-text text-muted">
                    {t("modals.passwordMinLength")}
                  </small>
                </div>
                <div className="form-group">
                  <a className="form-check-label" href="#">
                    {t("modals.forgotPassword")}
                  </a>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={this.login}
                >
                  {this.state.loading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    t("components.navbar.login")
                  )}
                </button>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(LoginModal);
