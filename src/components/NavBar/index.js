/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import { isAuthenticated, login, logout } from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./navbar.module.scss";

class NavBar extends Component {
  state = {
    isAuthenticated: isAuthenticated()
  };

  handleClick = async e => {
    e.preventDefault();
    login("token");
    this.setState({ isAuthenticated: true });
  };

  handleClick2 = async e => {
    e.preventDefault();
    logout();
    this.setState({ isAuthenticated: false });
  };

  render() {
    return (
      <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-dark`}>
        <a className={`navbar-brand float-left`} href="/">
          <span style={{ color: "#B10003" }}> Red</span>NX
        </a>
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
              <button type="button" className="btn btn-outline-secondary">
                <FontAwesomeIcon icon="search" aria-hidden="true" />
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03"
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
          id="navbarTogglerDemo03"
        >
          <ul className="navbar-nav mt-lg-0 float-none">
            <li className={`${styles.navbarButton} nav-item active`}>
              <a className="nav-link text-center" href="/">
                Inicio <span className="sr-only">(current)</span>
              </a>
              <div className={styles.navbarSelectedLine}></div>
            </li>
            <li className="nav-item">
              <a className="nav-link text-center" href="/">
                Descobrir
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled text-center"
                href="/"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-center"
                role="button"
                aria-disabled="true"
                data-toggle="modal"
                data-target="#loginModal"
              >
                Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-center"
                role="button"
                aria-disabled="true"
                data-toggle="modal"
                data-target="#registerModal"
              >
                Registrar
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.navbarDesktop} col`}>
          <ul className="navbar-nav mt-lg-0 float-none">
            <li className={`${styles.navbarButton} nav-item active`}>
              <a className="nav-link text-center" href="/">
                Inicio <span className="sr-only">(current)</span>
              </a>
              <div className={styles.navbarSelectedLine}></div>
            </li>
            <li className="nav-item">
              <a className="nav-link text-center" href="/">
                Descobrir
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled text-center"
                href="/"
                aria-disabled="true"
              >
                Disabled
              </a>
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
              placeholder="Search"
              aria-label="Search"
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
            <form
              className={`form-inline ${
                this.state.isAuthenticated ? "noAuthentication" : "show"
              }`}
            >
              <button
                className={`btn btn-sm btn-secondary mx-1`}
                type="button"
                data-toggle="modal"
                data-target="#loginModal"
              >
                Login
              </button>
              <button
                className={`btn btn-sm btn-primary mx-1`}
                type="button"
                data-toggle="modal"
                data-target="#registerModal"
              >
                Registrar
              </button>
            </form>
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
                    src="https://randomuser.me/api/portraits/men/65.jpg"
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
                <a className="dropdown-item" href="/">
                  ... ?
                </a>
                <a className="dropdown-item" href="/">
                  ... ?
                </a>
                <a
                  className="dropdown-item"
                  href="/"
                  onClick={this.handleClick2}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
