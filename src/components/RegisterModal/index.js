/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import $ from "jquery";

import styles from "./registermodal.module.scss";

class RegisterModal extends Component {
  handleRegisterButton() {
    $("#loginModal").modal("hide");
    $("#registerModal").modal("show");
  }

  handleLoginButton() {
    $("#registerModal").modal("hide");
    $("#loginModal").modal("show");
  }

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
              <form className={styles.form}>
                <div className="form-group">
                  <label>{t("modals.username")}</label>
                  <input
                    type="username"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder={t("modals.username")}
                  />
                </div>
                <div className="form-group">
                  <label>{t("modals.email")}</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder={t("modals.email")}
                  />
                </div>
                <div className="form-group">
                  <label>{t("modals.password")}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder={t("modals.password")}
                    aria-describedby="passwordHelp"
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
                  />
                </div>
                <div className="form-group">
                  <label>{t("modals.birthDate")}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                <div className="form-group">
                  <a className="form-check-label" href="#">
                    {t("modals.alreadyHasAccount")}
                  </a>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {t("components.navbar.register")}
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

export default withTranslation()(RegisterModal);
