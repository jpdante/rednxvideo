/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { isAuthenticated } from "../../services/auth";
import api from "../../library/api";

import { withTranslation } from "react-i18next";

import HCaptcha from "@hcaptcha/react-hcaptcha";

import styles from "../Login/login.module.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.hCaptchaRef = React.createRef();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: new Date(),
      error: "",
      success: "",
      errorData: null,
      loading: false,
    };
  }

  componentDidMount() {}

  handleVerificationSuccess = async (token) => {
    this.setState({
      captcha: token,
      error: "",
      loading: false,
    });
    const {
      username,
      email,
      password,
      confirmPassword,
      birthDate,
      captcha,
    } = this.state;
    if (!username) {
      this.setState({
        error: "errors.usernameEmpty",
        success: "",
      });
      return;
    }
    if (/^[a-zA-Z0-9_.-]*$/.test(username) === false) {
      this.setState({
        error: "errors.usernameInvalid",
        success: "",
      });
      return;
    }
    if (username.length < 3 || username.length > 20) {
      this.setState({
        error: "errors.usernameSize",
        success: "",
      });
      return;
    }
    if (!email) {
      this.setState({
        error: "errors.emailEmpty",
        success: "",
      });
      return;
    }
    if (!password) {
      this.setState({
        error: "errors.passwordEmpty",
        success: "",
      });
      return;
    }
    if (!confirmPassword) {
      this.setState({
        error: "errors.confirmPasswordEmpty",
        success: "",
      });
      return;
    }
    if (password !== confirmPassword) {
      this.setState({
        error: "errors.passwordsDontMatch",
        success: "",
      });
      return;
    }
    if (!birthDate) {
      this.setState({
        error: "errors.birthDateEmpty",
        success: "",
      });
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await api.register({
        username,
        email,
        password,
        birthdate: birthDate,
        captcha,
        lang: "pt-br",
      });
      this.setState({ loading: false });
      if (response.data.success) {
        this.setState({
          loading: false,
          error: "",
          success: "modals.accountCreated",
        });
      } else {
        this.setState({
          loading: false,
          error: response.data.message,
          errorData: response.data,
          success: "",
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
        error: "errors.loginError",
        success: "",
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.hCaptchaRef.current.execute();
  };

  render() {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    } else {
      const { t } = this.props;
      return (
        <FadeIn className="page-content" childClassName="fix-fadein">
          <div className="py-5">
            <div class={`${styles.fixBorder} shadow`}>
              <div className={`${styles.authContainer}`}>
                <h4 className="text-center w-100">
                  <span style={{ color: "#B10003" }}>Red</span>NX
                </h4>
                <div className={`${styles.bar}`}>
                  <div className="">
                    <div className={`${styles.button} float-left`}>
                      <Link className={`text-center`} to="/login">
                        {t("components.navbar.login")}
                      </Link>
                      <hr />
                    </div>
                    <div
                      className={`${styles.button} ${styles.active} float-left`}
                    >
                      <Link className={`text-center`} to="/register">
                        {t("components.navbar.register")}
                      </Link>
                      <hr />
                    </div>
                    <div className={`${styles.button} float-none`}>&nbsp;</div>
                  </div>
                  <hr />
                </div>
                <form className={styles.form} onSubmit={this.handleSubmit}>
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
                    {/*<input
                    className="form-control datepicker"
                    placeholder="dd/mm/yyyy"
                    data-date-format="dd/mm/yyyy"
                    pattern="[0-9]{8}"
                    required
                    onChange={(e) =>
                      this.setState({ birthDate: e.target.value })
                    }
                  />*/}
                    <DatePicker
                      style={{ width: "100%" }}
                      selected={this.state.birthDate}
                      onChange={(date) => this.setState({ birthDate: date })}
                      maxDate={new Date()}
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                    />
                  </div>
                  <div className="form-group">
                    <Link className="form-check-label" to="/login">
                      {t("modals.alreadyHasAccount")}
                    </Link>
                  </div>
                  <div className="text-center">
                    <HCaptcha
                      ref={this.hCaptchaRef}
                      className="text-center"
                      sitekey="0bf5a996-480a-4bab-81b5-20d85f1ade44"
                      theme="dark"
                      size="invisible"
                      onVerify={(token) =>
                        this.handleVerificationSuccess(token)
                      }
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
        </FadeIn>
      );
    }
  }
}

export default withTranslation()(Register);
