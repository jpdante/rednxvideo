/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";

import { withTranslation } from "react-i18next";

import { login, isAuthenticated } from "../../services/auth";
import api from "../../library/api";
import { setProfileUsername, setProfilePicture, setProfileEmail } from "../../services/profile";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import styles from "./login.module.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.hCaptchaRef = React.createRef();
    this.state = {
      email: "",
      password: "",
      error: "",
      captcha: "",
      loading: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.hCaptchaRef.current.execute();
  };

  handleVerificationSuccess = async (token) => {
    this.setState({
      captcha: token,
      error: "",
      loading: false,
    });
    const { email, password, captcha } = this.state;
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
      const response = await api.login({
        email,
        password,
        captcha,
      });
      this.setState({ loading: false });
      if (response.data.success) {
        login(response.data.token);
        setProfileUsername(response.data.account.username);
        setProfilePicture(response.data.account.profilePicture);
        setProfileEmail(email);
        window.location.reload();
      } else {
        this.setState({
          error: response.data.message,
          errorData: response.data,
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        error: "errors.loginError",
      });
    }
  };

  render() {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    } else {
      const { t } = this.props;
      return (
        <FadeIn className="page-content" childClassName="fix-fadein">
          <div className="center-page-content">
            <div class={`${styles.fixBorder} shadow`}>
              <div className={`${styles.authContainer}`}>
                <h4 className="text-center w-100">
                  <span style={{ color: "#B10003" }}>Red</span>NX
                </h4>
                <div className={`${styles.bar}`}>
                  <div>
                    <div
                      className={`${styles.button} ${styles.active} float-left`}
                    >
                      <Link className={`text-center`} to="/login">
                        {t("components.navbar.login")}
                      </Link>
                      <hr />
                    </div>
                    <div className={`${styles.button} float-left`}>
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
                    <Link className="form-check-label" to="/forgot-password">
                      {t("modals.forgotPassword")}
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
                  <div className="text-center my-3">
                    <p>
                      {t("hcaptcha.msg1")}{" "}
                      <a href="https://hcaptcha.com/privacy">
                        {t("hcaptcha.privacyPolicy")}
                      </a>{" "}
                      {t("hcaptcha.msg2")}{" "}
                      <a href="https://hcaptcha.com/terms">
                        {t("hcaptcha.termsOfService")}
                      </a>{" "}
                      {t("hcaptcha.msg3")}
                    </p>
                  </div>
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

export default withTranslation()(Login);
