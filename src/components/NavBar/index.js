/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { isAuthenticated, logout } from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProfilePicture } from "../../services/profile";

import styles from "./navbar.module.scss";

class NavBar extends Component {
  state = {
    isAuthenticated: isAuthenticated(),
  };

  logout = async (e) => {
    e.preventDefault();
    logout();
    this.setState({ isAuthenticated: false });
    window.location.reload();
  };

  render() {
    const { t } = this.props;
    return (
      <nav
        className={`${styles.navbar} navbar navbar-expand-lg navbar-dark fixed-top`}
      >
        <Link className={`navbar-brand float-left`} to="/">
          <span style={{ color: "#B10003" }}> Red</span>NX
        </Link>
        <div className={`${styles.navbarMobile} col`}>
          <div
            className={`${styles.searchBar} input-group mx-auto form-inline`}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                type="button"
                className={`btn btn-outline-secondary ${styles.searchIcon}`}
              >
                <FontAwesomeIcon icon="search" aria-hidden="true" />
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`collapse navbar-collapse ${styles.navbarMobile}`}
          id="mainNavbar"
        >
          <ul className="navbar-nav mt-lg-0 float-none">
            <li className={`${styles.navbarButton} nav-item active`}>
              <Link className="nav-link text-center" to="/">
                {t("components.navbar.home")}{" "}
                <span className="sr-only">(current)</span>
              </Link>
              <div className={styles.navbarSelectedLine}></div>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" to="/discover">
                {t("components.navbar.discover")}
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-center"
                data-toggle="modal"
                data-target="#languageModal"
                href="#a"
              >
                {t("components.navbar.language")}
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" to="/login">
                {t("components.navbar.login")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" to="/register">
                {t("components.navbar.register")}
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.navbarDesktop} col`}>
          <ul className="navbar-nav mt-lg-0 float-none">
            <li className={`${styles.navbarButton} nav-item active`}>
              <Link className="nav-link text-center" to="/">
                {t("components.navbar.home")}{" "}
                <span className="sr-only">(current)</span>
              </Link>
              <div className={styles.navbarSelectedLine}></div>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" to="/discover">
                {t("components.navbar.discover")}
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.navbarDesktop} col`}>
          <div
            className={`${styles.searchBar} input-group mx-auto form-inline`}
          >
            <input
              type="text"
              className="form-control"
              placeholder={t("components.navbar.search")}
              aria-label={t("components.navbar.search")}
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-outline-secondary">
                <FontAwesomeIcon icon="search" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.navbarDesktop} col`}>
          <ul className="navbar-nav mt-lg-0 mx-auto float-right">
            <div
              className={`form-inline ${
                this.state.isAuthenticated ? "noAuthentication" : "show"
              }`}
            >
              <button
                className="btn btn-sm btn-secondary mx-1"
                data-toggle="modal"
                data-target="#languageModal"
              >
                {t("components.navbar.language")}
              </button>
              <Link className={`btn btn-sm btn-secondary mx-1`} to="/login">
                {t("components.navbar.login")}
              </Link>
              <Link className={`btn btn-sm btn-primary mx-1`} to="/register">
                {t("components.navbar.register")}
              </Link>
            </div>

            <li
              className={`${
                this.state.isAuthenticated ? "show" : "noAuthentication"
              } nav-item dropdown`}
            >
              <a
                className={`${styles.userBar} nav-link`}
                href="/"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  <img
                    src={getProfilePicture()}
                    width="30"
                    height="30"
                    className="rounded mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                </div>
              </a>
              <div
                className={`${styles.animate} ${styles.slideIn} dropdown-menu dropdown-menu-right`}
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/profile">
                  {t("components.navbar.profile")}
                </Link>
                <button
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#languageModal"
                >
                  {t("components.navbar.language")}
                </button>
                <button className="dropdown-item" onClick={this.logout}>
                  {t("components.navbar.logout")}
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withTranslation()(NavBar);
