import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { isAuthenticated } from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./sidebar.module.scss";

class SideBar extends Component {
  state = {
    isAuthenticated: isAuthenticated(),
  };

  render() {
    const { t } = this.props;
    return (
      <div className={`${styles.sideBar}`}>
        <div id="main-nav">
          <nav className={`${styles.navVertical} nav flex-column`}>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/">
                <FontAwesomeIcon icon="fire" className={styles.icon} />{" "}
                {t("components.navbar.hot")}
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/">
                <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />{" "}
                {t("shared.recommended", { count: 2 })}
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/">
                <FontAwesomeIcon
                  icon="satellite-dish"
                  className={styles.icon}
                />{" "}
                {t("components.navbar.live")}
              </a>
            </li>
            {this.state.isAuthenticated && (
              <li className={`${styles.navTable}`}>
                <a
                  className={`${styles.navLink} nav-link disabled`}
                  href="/"
                  alt="Desativado"
                >
                  <FontAwesomeIcon icon="heart" className={styles.icon} />{" "}
                  {t("components.navbar.following")}
                </a>
              </li>
            )}
            {this.state.isAuthenticated && (
              <li className={`${styles.navTable}`}>
                <a className={`${styles.navLink} nav-link disabled`} href="/">
                  <FontAwesomeIcon icon="history" className={styles.icon} />{" "}
                  {t("components.navbar.history")}
                </a>
              </li>
            )}
          </nav>
        </div>
        <div
          id="following-nav"
          className={this.state.isAuthenticated ? "show" : "noAuthentication"}
        >
          <hr />
          <nav className={`${styles.navVertical} nav flex-column`}>
            <p>{t("components.navbar.following")}</p>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/a/AATXAJyVzvS5VwifcSWwYzMSjz0SjtKCNuQ3cjcQ7Q=s288-c-k-c0xffffffff-no-rj-mo"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  PentagramaSG
                </div>
                <div className="float-right">
                  <span className="badge badge-primary">3</span>
                </div>
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/a/AATXAJxyFPzS26mEMneX4cFmE11hm2sbc9s7GOyM5g=s288-c-k-c0xffffffff-no-rj-mo"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  MikaGamer
                </div>
                <div className="float-right">
                  <span className="badge badge-primary">5</span>
                </div>
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/-sNHMsBMptyM/AAAAAAAAAAI/AAAAAAAAAAA/vsaEYt0DpQI/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  Ellisiumx
                </div>
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/a/AATXAJxGOgmcqR8CvdWpCMMABdif-wvgZeeE5xIeqw=s288-c-k-c0xffffffff-no-rj-mo"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  Caverinha
                </div>
                <div className="float-right">
                  <span className="badge badge-primary">7</span>
                </div>
              </a>
            </li>
          </nav>
        </div>
        <hr />
        <nav className={`${styles.navVertical} nav flex-column`}>
          <p>{t("shared.category", { count: 2 })}</p>
          <li className={`${styles.navTable}`}>
            <Link
              className={`${styles.navLink} nav-link`}
              to="/category/science"
            >
              <FontAwesomeIcon icon="vial" className={styles.icon} />
              {t("shared.science")}
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link
              className={`${styles.navLink} nav-link`}
              to="/category/comedy"
            >
              <FontAwesomeIcon icon="theater-masks" className={styles.icon} />
              {t("shared.comedy")}
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link
              className={`${styles.navLink} nav-link`}
              to="/category/games"
            >
              <FontAwesomeIcon icon="gamepad" className={styles.icon} />
              {t("shared.games")}
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link
              className={`${styles.navLink} nav-link`}
              to="/category/vlog"
            >
              <FontAwesomeIcon icon="camera" className={styles.icon} />
              {t("shared.vlogs")}
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link
              className={`${styles.navLink} nav-link`}
              to="/category/sports"
            >
              <FontAwesomeIcon icon="futbol" className={styles.icon} />
              {t("shared.sports")}
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link
              className={`${styles.navLink} nav-link`}
              to="/category/education"
            >
              <FontAwesomeIcon icon="graduation-cap" className={styles.icon} />
              {t("shared.education")}
            </Link>
          </li>
        </nav>
      </div>
    );
  }
}

export default withTranslation()(SideBar);
