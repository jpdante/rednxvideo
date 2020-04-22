/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import api from "../../services/api";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import $ from "jquery";
import "bootstrap-datepicker/js/bootstrap-datepicker";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css";

import styles from "./register.module.scss";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    error: "",
    success: "",
    errorData: null,
    loading: false
  };

  componentDidMount() {
    $(".datepicker")
      .datepicker()
      .on("changeDate", (ev) => {
        this.setState({ birthDate: ev.target.value });
      });
  }

  handleRegisterButton() {
    $("#loginModal").modal("hide");
    $("#registerModal").modal("show");
  }

  handleLoginButton() {
    $("#registerModal").modal("hide");
    $("#loginModal").modal("show");
  }

  handleVerificationSuccess(token) {
    this.setState({
      captcha: token,
    });
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    this.setState({
      error: "",
    });
    const {
      username,
      email,
      password,
      confirmPassword,
      birthDate,
      captcha
    } = this.state;
    if (!username) {
      this.setState({ error: "errors.passwordEmpty", success: "" });
      return;
    }
    if (!email) {
      this.setState({ error: "errors.emailEmpty", success: "" });
      return;
    }
    if (!password) {
      this.setState({ error: "errors.passwordEmpty", success: "" });
      return;
    }
    if (!confirmPassword) {
      this.setState({ error: "errors.confirmPasswordEmpty", success: "" });
      return;
    }
    if (password !== confirmPassword) {
      this.setState({ error: "errors.passwordsDontMatch", success: "" });
      return;
    }
    if (!birthDate) {
      this.setState({ error: "errors.birthDateEmpty", success: "" });
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await api.post("/api/register", {
        username,
        email,
        password,
        birthdate: birthDate,
        captcha,
        lang: "pt-br"
      });
      this.setState({ loading: false });
      if (response.data.success) {
        this.setState({ error: "", success: "modals.accountCreated" });
      } else {
        this.setState({
          error: response.data.message,
          errorData: response.data,
          success: "",
        });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
      this.setState({ error: "errors.loginError", success: "" });
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal fade"
        id="registerModal"
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
                <div className="">
                  <div className={`${styles.button} float-left`}>
                    <a
                      className={`text-center`}
                      role="button"
                      onClick={this.handleLoginButton}
                    >
                      {t("components.navbar.login")}
                    </a>
                    <hr />
                  </div>
                  <div
                    className={`${styles.button} ${styles.active} float-left`}
                  >
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
              <form className={styles.form} onSubmit={this.handleSignUp}>
                {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    {t(this.state.error, this.state.errorData)}
                  </div>
                )}
                {this.state.success && (
                  <div className="alert alert-success" role="alert">
                    {t(this.state.success)}
                  </div>
                )}
                <div className="form-group">
                  <label>{t("modals.username")}</label>
                  <input
                    type="username"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder={t("modals.username")}
                    required
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>{t("modals.email")}</label>
                  <input
                    type="email"
                    className="form-control"
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
                    aria-describedby="passwordHelp"
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
                  <label>{t("modals.confirmPassword")}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder={t("modals.password")}
                    required
                    minlength="8"
                    onChange={(e) =>
                      this.setState({ confirmPassword: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>{t("modals.birthDate")}</label>
                  <input
                    className="form-control datepicker"
                    placeholder="dd/mm/yyyy"
                    data-date-format="dd/mm/yyyy"
                    required
                    onChange={(e) =>
                      this.setState({ birthDate: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <a
                    className="form-check-label"
                    href="#"
                    onClick={this.handleLoginButton}
                  >
                    {t("modals.alreadyHasAccount")}
                  </a>
                </div>
                <div className="text-center">
                  <HCaptcha
                    className="text-center"
                    sitekey="0bf5a996-480a-4bab-81b5-20d85f1ade44"
                    theme="dark"
                    onVerify={(token) => this.handleVerificationSuccess(token)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {this.state.loading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    t("components.navbar.register")
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

export default withTranslation()(Register);
