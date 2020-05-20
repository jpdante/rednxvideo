/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";

import { withTranslation } from "react-i18next";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import Loading from "../Loading/";
import api from "../../library/api";
import { isAuthenticated } from "../../services/auth";

import styles from "./newchannel.module.scss";

class NewChannel extends Component {
  constructor(props) {
    super(props);
    this.hCaptchaRef = React.createRef();
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
    const { channelName, channelLink, captcha } = this.state;
    if (!channelName) {
      this.setState({ error: "errors.channelNameEmpty" });
      return;
    }
    if (!channelLink) {
      this.setState({ error: "errors.channelLinkEmpty" });
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await api.newChannel(channelName, channelLink, captcha);
      this.setState({ loading: false });
      if (response.data.success) {
        this.setState({
          error: "",
          errorData: {}
        });
        this.props.history.push("/select-channel")
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
      console.error(err);
    }
  };

  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/" />;
    } else {
      const { t } = this.props;
      if (this.state.loadingPage) {
        return <Loading />;
      } else {
        if (!this.state.allowCreate) {
          return (
            <FadeIn className="page-content" childClassName="fix-fadein">
              <div className="center-page-content">
                <div className={`${styles.fixBorder} text-center`}>
                  <img src="/assets/erro.svg" alt="error" width="100"></img>
                  <br />
                  <br />
                  <h1 style={{ color: "#B10003" }}>
                    {t("errors.operationDenied")}
                  </h1>
                  <h4>{t("errors.maxChannelsHit")}</h4>
                </div>
              </div>
            </FadeIn>
          );
        } else {
          return (
            <FadeIn className="page-content" childClassName="fix-fadein">
              <div className="center-page-content">
                <div className={`${styles.fixBorder} shadow`}>
                  <div className={`${styles.authContainer}`}>
                    <h4 className="text-center w-100">
                      <span style={{ color: "#B10003" }}>Red</span>NX
                    </h4>
                    <div className={`${styles.bar}`}>
                      <div className={`${styles.button} ${styles.active}`}>
                        <Link className={`text-center`} to="/login">
                          {t("pages.newChannel.newChannel")}
                        </Link>
                        <hr />
                      </div>
                    </div>
                    <form className={styles.form} onSubmit={this.handleSubmit}>
                      {this.state.error && (
                        <div className="alert alert-danger" role="alert">
                          {t(this.state.error, this.state.errorData)}
                        </div>
                      )}
                      <div className="form-group">
                        <label>{t("modals.channelName")}</label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="channelNameHelp"
                          placeholder={t("modals.channelName")}
                          required
                          maxLength="32"
                          onChange={(e) => {
                            if (e.target.value.length > 32) {
                              e.target.value = e.target.value.substring(0, 32);
                            }
                            var link = e.target.value.toLowerCase();
                            link = link.replace("/ /g", "");
                            if (link.length > 16) {
                              link = link.substring(0, 16);
                            }
                            link = link.replace(new RegExp("\\s", 'g'),"");
                            link = link.replace(new RegExp("[àáâãäå]", 'g'),"a");
                            link = link.replace(new RegExp("æ", 'g'),"ae");
                            link = link.replace(new RegExp("ç", 'g'),"c");
                            link = link.replace(new RegExp("[èéêë]", 'g'),"e");
                            link = link.replace(new RegExp("[ìíîï]", 'g'),"i");
                            link = link.replace(new RegExp("ñ", 'g'),"n");                            
                            link = link.replace(new RegExp("[òóôõö]", 'g'),"o");
                            link = link.replace(new RegExp("œ", 'g'),"oe");
                            link = link.replace(new RegExp("[ùúûü]", 'g'),"u");
                            link = link.replace(new RegExp("[ýÿ]", 'g'),"y");
                            link = link.replace(new RegExp("\\W", 'g'),"");
                            this.setState({
                              channelName: e.target.value,
                              channelLink: link
                            });
                          }}
                        />
                        <small className="form-text text-muted">
                          {t("modals.channelNameMaxLength")}
                        </small>
                      </div>
                      <div className="form-group">
                        <label>{t("modals.channelLink")}</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">/channel/</span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("modals.channelLink")}
                            required
                            maxLength="16"
                            value={this.state.channelLink}
                            onChange={(e) => {
                              if (e.target.value.length > 16) {
                                e.target.value = e.target.value.substring(0, 16);
                              }
                              this.setState({ channelLink: e.target.value });
                            }}
                          />
                        </div>
                        <small className="form-text text-muted">
                          {t("modals.channelLinkMaxLength")}
                        </small>
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
                          t("pages.newChannel.createChannel")
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
  }
}

export default withTranslation()(NewChannel);
